"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Pos = { x: number; y: number };

export default function OutfitCanvas({
  titleTop,
  titleBottom,
  initialArtist = { x: -120, y: 120 },
  initialSoftware = { x: 830, y: 130 },
  artistTarget = "/art-home",
  softwareTarget = "/cv-home",
  containerSize = { width: 1160, height: 740 },
  rubySize = { width: 520, height: 740 },
  artistSub,
  softwareSub,
}: {
  titleTop: string;
  titleBottom?: string;
  initialArtist?: Pos;
  initialSoftware?: Pos;
  artistTarget?: string;
  softwareTarget?: string;
  containerSize?: { width: number; height: number };
  rubySize?: { width: number; height: number };
  artistSub?: string;
  softwareSub?: string;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rubyRef = useRef<HTMLDivElement | null>(null);
  const artistElRef = useRef<HTMLDivElement | null>(null);
  const softwareElRef = useRef<HTMLDivElement | null>(null);

  const draggingRef = useRef<{
    id: "artist" | "software" | null;
    setPos: React.Dispatch<React.SetStateAction<Pos>> | null;
    offsetX: number;
    offsetY: number;
    imgW: number;
    imgH: number;
    currentX: number;
    currentY: number;
    el?: HTMLDivElement | null;
    rAF?: number | null;
  } | null>(null);

  const [artistPos, setArtistPos] = useState<Pos>(initialArtist);
  const [softwarePos, setSoftwarePos] = useState<Pos>(initialSoftware);

  const navigateAfterDelay = (path: string) => setTimeout(() => router.push(path), 350);

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

      if (dr.el) {
        if (dr.rAF) cancelAnimationFrame(dr.rAF);
        dr.rAF = requestAnimationFrame(() => {
          dr.el!.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
        });
      }
    }

    function onPointerUp() {
      const dr = draggingRef.current;
      if (dr && dr.setPos) {
        if (dr.rAF) {
          cancelAnimationFrame(dr.rAF);
          dr.rAF = undefined;
        }
        dr.setPos({ x: dr.currentX, y: dr.currentY });
      }

      if (dr && containerRef.current && rubyRef.current) {
        const { id, imgW, imgH, currentX, currentY } = dr;
        if (id) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const rubyRect = rubyRef.current.getBoundingClientRect();
          const draggedRect = new DOMRect(containerRect.left + currentX, containerRect.top + currentY, imgW, imgH);
          const intersectionArea = isIntersecting(rubyRect, draggedRect);
          const rubyArea = rubyRect.width * rubyRect.height;
          if (rubyArea > 0 && intersectionArea / rubyArea > 0.2) {
            if (id === "artist") navigateAfterDelay(artistTarget);
            else if (id === "software") navigateAfterDelay(softwareTarget);
          }
        }
      }

      if (dr) dr.el = null;
      draggingRef.current = null;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [artistTarget, softwareTarget, router]);

  function startDrag(
    e: React.PointerEvent,
    id: "artist" | "software",
    pos: Pos,
    setPos: React.Dispatch<React.SetStateAction<Pos>>
  ) {
    const el = e.currentTarget as HTMLDivElement;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const imgW = el.offsetWidth;
    const imgH = el.offsetHeight;
    const offsetX = e.clientX - (rect.left + pos.x);
    const offsetY = e.clientY - (rect.top + pos.y);

    el.style.willChange = "transform";
    el.style.transition = "none";
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

  function animateTo(el: HTMLDivElement, targetX: number, targetY: number, setPos: (p: Pos) => void) {
    if (!el) return;
    if (draggingRef.current) return;
    el.style.willChange = "transform";
    el.style.transition = "transform 300ms ease";
    el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    const cleanup = () => {
      el.style.transition = "none";
      setPos({ x: targetX, y: targetY });
      setTimeout(() => (el.style.willChange = ""), 50);
    };
    const onEnd = () => cleanup();
    el.addEventListener("transitionend", onEnd, { once: true });
    setTimeout(() => {
      if (el.style.transition) cleanup();
    }, 400);
  }

  function moveOverRuby(refEl: React.RefObject<HTMLDivElement | null>, setPos: (p: Pos) => void, targetPath: string) {
    if (!containerRef.current || !rubyRef.current || !refEl.current) return;
    if (draggingRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const rubyRect = rubyRef.current.getBoundingClientRect();
    const el = refEl.current!;
    const imgW = el.offsetWidth;
    const imgH = el.offsetHeight;

    const targetX = (rubyRect.left - containerRect.left) + (rubyRect.width - imgW) / 2;
    // lower target position by 75px if artistSub or softwareSub exists
    let targetY = (rubyRect.top - containerRect.top) + (rubyRect.height - imgH) / 2;
    if (artistSub || softwareSub) {
      targetY += 85;
    }

    animateTo(el, targetX, targetY, setPos);

    setTimeout(() => {
      const draggedRect = new DOMRect(containerRect.left + targetX, containerRect.top + targetY, imgW, imgH);
      const ix = Math.max(0, Math.min(rubyRect.right, draggedRect.right) - Math.max(rubyRect.left, draggedRect.left));
      const iy = Math.max(0, Math.min(rubyRect.bottom, draggedRect.bottom) - Math.max(rubyRect.top, draggedRect.top));
      const intersectionArea = ix * iy;
      const rubyArea = rubyRect.width * rubyRect.height;
      if (rubyArea > 0 && intersectionArea / rubyArea > 0.2) {
        navigateAfterDelay(targetPath);
      }
    }, 360);
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');`}</style>
      <div className="text-center">
        <h2 className="nothing-you-could-do-regular text-4xl mb-1">{titleTop}</h2>
        {titleBottom && <h2 className="nothing-you-could-do-regular text-4xl mb-1">{titleBottom}</h2>}

      <div
        ref={containerRef}
        className="relative mx-auto mt-2 -mb-25"
        style={{ width: containerSize.width, height: containerSize.height }}
      >
        <div
          ref={rubyRef}
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ width: rubySize.width, height: rubySize.height }}
        >
          <img src="/ruby.png" alt="Ruby" className="w-full h-full object-cover filter saturate-50 contrast-130" draggable={false} />
        </div>

        <div
          ref={artistElRef}
          draggable={false}
          onPointerDown={(e) => startDrag(e, "artist", artistPos, setArtistPos)}
          onClick={() => moveOverRuby(artistElRef, setArtistPos, artistTarget)}
          className="absolute w-96 cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
          style={{ transform: `translate3d(${artistPos.x}px, ${artistPos.y}px, 0)`, touchAction: "none" }}
        >
          <img src="/Artist.png" alt="Artist" className="w-full h-auto pointer-events-none" />
          {/* optional subheading under Artist */}
          {artistSub && (
            <>
              <h2 className="nothing-you-could-do-regular text-4xl mt-21">{artistSub}</h2>
              <p className="nothing-you-could-do-regular mt-2 text-xl">(Click me)</p>
            </>
          )}
        </div>

        <div
          ref={softwareElRef}
          draggable={false}
          onPointerDown={(e) => startDrag(e, "software", softwarePos, setSoftwarePos)}
          onClick={() => moveOverRuby(softwareElRef, setSoftwarePos, softwareTarget)}
          className="absolute w-96 cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
          style={{ transform: `translate3d(${softwarePos.x}px, ${softwarePos.y}px, 0)`, touchAction: "none" }}
        >
          <img src="/Software.png" alt="Software" className="w-full h-auto pointer-events-none" />
          {/* optional subheading under Software */}
          {softwareSub && (
            <>
              <h2 className="nothing-you-could-do-regular text-4xl mt-31">{softwareSub}</h2>
              <p className="nothing-you-could-do-regular mt-2 text-xl">(or drag me)</p>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}