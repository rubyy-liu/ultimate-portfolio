"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  // helper: wait 400ms then navigate to given path
  const navigateAfterDelay = (path: string) => setTimeout(() => router.push(path), 400);

  const containerRef = useRef<HTMLDivElement>(null);
  const rubyRef = useRef<HTMLDivElement>(null);
  const artistElRef = useRef<HTMLDivElement | null>(null);
  const softwareElRef = useRef<HTMLDivElement | null>(null);

  const draggingRef = useRef<{
    id: "artist" | "software" | null;
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>> | null;
    offsetX: number;
    offsetY: number;
    imgW: number;
    imgH: number;
    currentX: number;
    currentY: number;
    el?: HTMLDivElement | null;
    rAF?: number | null;
  } | null>(null);

  // initial positions (px) relative to container top-left
  const [artistPos, setArtistPos] = useState({ x: -120, y: 180 });
  const [softwarePos, setSoftwarePos] = useState({ x: 830, y: 110 });

  useEffect(() => {
    function isIntersecting(r1: DOMRect, r2: DOMRect) {
      const ix = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
      const iy = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
      return ix * iy;
    }

    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dr = draggingRef.current;
      const { offsetX, offsetY, imgW, imgH } = dr;
      let newX = e.clientX - rect.left - offsetX;
      let newY = e.clientY - rect.top - offsetY;

      const minX = -imgW * 0.75;
      const maxX = rect.width - imgW * 0.25;
      const minY = -imgH * 0.25;
      const maxY = rect.height - imgH * 0.25;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      dr.currentX = newX;
      dr.currentY = newY;

      // update DOM directly in rAF for smoothness (avoid React state updates each frame)
      if (dr.el) {
        if (dr.rAF) cancelAnimationFrame(dr.rAF);
        dr.rAF = requestAnimationFrame(() => {
          dr.el!.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
        });
      }
    }

    function onPointerUp() {
      // persist final position into React state once
      const dr = draggingRef.current;
      if (dr && dr.setPos) {
        // cancel any pending rAF
        if (dr.rAF) {
          cancelAnimationFrame(dr.rAF);
          dr.rAF = undefined;
        }
        // update React state so initial render positions stay in sync
        dr.setPos({ x: dr.currentX, y: dr.currentY });
      }

      // existing ruby overlap check (keep as-is)
      if (dr && containerRef.current && rubyRef.current) {
        const { id, imgW, imgH, currentX, currentY } = dr;
        if (id) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const rubyRect = rubyRef.current.getBoundingClientRect();
          const draggedRect = new DOMRect(containerRect.left + currentX, containerRect.top + currentY, imgW, imgH);
          const intersectionArea = isIntersecting(rubyRect, draggedRect);
          const rubyArea = rubyRect.width * rubyRect.height;
          if (rubyArea > 0 && intersectionArea / rubyArea > 0.2) {
            // navigate based on which image was dropped over ruby
            if (id === "artist") navigateAfterDelay("/art-home");
            else if (id === "software") navigateAfterDelay("/cv-home");
          }
        }
      }

      // clear ref
      if (dr) dr.el = null;
      draggingRef.current = null;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [router]);

  function startDrag(
    e: React.PointerEvent,
    id: "artist" | "software",
    pos: { x: number; y: number },
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) {
    const el = e.currentTarget as HTMLDivElement;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const imgW = el.offsetWidth;
    const imgH = el.offsetHeight;
    const offsetX = e.clientX - (rect.left + pos.x);
    const offsetY = e.clientY - (rect.top + pos.y);

    // store element and metrics; set initial transform so we can move by transform
    el.style.willChange = "transform";
    el.style.transition = "none"; // disable transitions while dragging
    // set initial transform to match state position
    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

    draggingRef.current = {
      id,
      setPos,
      offsetX,
      offsetY,
      imgW,
      imgH,
      currentX: pos.x,
      currentY: pos.y,
      el,
      rAF: undefined,
    };
    el.setPointerCapture(e.pointerId);
  }

  // animate an element to target transform and persist final state
  function animateTo(el: HTMLDivElement, targetX: number, targetY: number, setPos: (p: { x: number; y: number }) => void) {
    console.log(`Animating to: ${targetX}, ${targetY}`);
    if (!el) return;
    // if currently dragging, ignore
    if (draggingRef.current) return;

    el.style.willChange = "transform";
    el.style.transition = "transform 300ms ease";
    // set transform
    el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

    const cleanup = () => {
      el.style.transition = "none";
      el.removeEventListener("transitionend", onEnd);
      setPos({ x: targetX, y: targetY });
      // small timeout to allow next transitions if needed
      setTimeout(() => (el.style.willChange = ""), 50);
    };
    const onEnd = () => cleanup();
    el.addEventListener("transitionend", onEnd, { once: true });

    // safety fallback in case transitionend doesn't fire
    setTimeout(() => {
      if (el.style.transition) cleanup();
    }, 400);
  }

  // click handler to move an item over the ruby
  function moveOverRuby(
    refEl: React.RefObject<HTMLDivElement | null>,
    setPos: (p: { x: number; y: number }) => void,
    targetPath: string
  ) {
    if (!containerRef.current || !rubyRef.current || !refEl.current) return;
    if (draggingRef.current) return; // ignore while dragging

    const containerRect = containerRef.current.getBoundingClientRect();
    const rubyRect = rubyRef.current.getBoundingClientRect();
    const el = refEl.current!;
    const imgW = el.offsetWidth;
    const imgH = el.offsetHeight;

    // position to center the dragged image over the ruby
    const targetX = (rubyRect.left - containerRect.left) + (rubyRect.width - imgW) / 2;
    const targetY = (rubyRect.top - containerRect.top) + (rubyRect.height - imgH) / 2 + 70; // lowered by 50px

    animateTo(el, targetX, targetY, setPos);

    // after animating, check overlap and navigate if enough overlap
    // we can re-check after a short delay to allow the animation to complete
    setTimeout(() => {
      const draggedRect = new DOMRect(containerRect.left + targetX, containerRect.top + targetY, imgW, imgH);
      const ix = Math.max(0, Math.min(rubyRect.right, draggedRect.right) - Math.max(rubyRect.left, draggedRect.left));
      const iy = Math.max(0, Math.min(rubyRect.bottom, draggedRect.bottom) - Math.max(rubyRect.top, draggedRect.top));
      const intersectionArea = ix * iy;
      const rubyArea = rubyRect.width * rubyRect.height;
      if (rubyArea > 0 && intersectionArea / rubyArea > 0.2) {
        // navigate to the provided target path
        navigateAfterDelay(targetPath);
      }
    }, 360);
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');`}</style>
      <main className="grid-background h-[100vh] flex items-center justify-center flex-col">
        <div className="text-center">
          <h2 className="nothing-you-could-do-regular text-4xl mb-1">Hi I'm Ruby</h2>
          <h2 className="nothing-you-could-do-regular text-4xl mb-1">Could you please complete my outfit</h2>

          {/* container holds the ruby image and the draggable overlays */}
          <div
            ref={containerRef}
            className="relative w-[1160px] h-[740px] mx-auto -mt-50"
            aria-label="draggable-canvas"
          >
            {/* center ruby image */}
            <div
              ref={rubyRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[740px] overflow-hidden"
            >
              <img
                src="/ruby.png"
                alt="Ruby"
                className="w-full h-full object-cover filter saturate-50 contrast-130"
                draggable={false}
              />
            </div>

            {/* Artist (draggable + clickable) */}
            <div
              ref={artistElRef}
              draggable={false}
              onPointerDown={(e) => startDrag(e, "artist", artistPos, setArtistPos)}
              onClick={() => moveOverRuby(artistElRef, setArtistPos, "/art-home")}
              className="absolute w-96 cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
              style={{
                transform: `translate3d(${artistPos.x}px, ${artistPos.y}px, 0)`,
                touchAction: "none",
              }}
            >
              <img src="/Artist.png" alt="Artist" className="w-full h-auto pointer-events-none" />
              <h2 className="nothing-you-could-do-regular text-4xl mt-25">Artist</h2>
              <p className="nothing-you-could-do-regular mt-2 text-xl">(Click me)</p>
            </div>

            {/* Software (draggable + clickable) */}
            <div
              ref={softwareElRef}
              draggable={false}
              onPointerDown={(e) => startDrag(e, "software", softwarePos, setSoftwarePos)}
              onClick={() => moveOverRuby(softwareElRef, setSoftwarePos, "/cv-home")}
              className="absolute w-96 cursor-grab active:cursor-grabbing select-none flex flex-col items-center mt-12"
              style={{
                transform: `translate3d(${softwarePos.x}px, ${softwarePos.y}px, 0)`,
                touchAction: "none",
              }}
            >
              <img src="/Software.png" alt="Software" className="w-full h-auto pointer-events-none" />
              <h2 className="nothing-you-could-do-regular text-4xl mt-41">Software Developer</h2>
              <p className="nothing-you-could-do-regular mt-2 text-xl">(Or drag me)</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
