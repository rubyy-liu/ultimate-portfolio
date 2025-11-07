"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const handleKeyNav = (e: React.KeyboardEvent, path: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(path);
    }
  };

  // fade the scroll indicator as the user scrolls
  const [indicatorOpacity, setIndicatorOpacity] = useState(1);
  useEffect(() => {
    let ticking = false;
    const maxFade = 220; // px scrolled to fully hide
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const o = Math.max(0, 1 - y / maxFade);
        setIndicatorOpacity(o);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#2C2C2C] flex items-center justify-center flex-col pb-8">
      <div className="relative max-w-[97vw] w-full flex items-center justify-center">
        <img
          src="/main.jpg"
          alt="Art Home Background"
          className="max-h-[90vh] w-[97vw] rounded-2xl object-cover shadow-lg block"
        />

        {/* overlay title on the right side - sizes use clamp so they scale with the image/container */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
        right: "20%",
        top: "30%",
        transform: "translateY(-50%)",
        maxWidth: "30%",
          }}
        >
          <h1
        className="font-semibold leading-tight"
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
        RUBY
          </h1>
          <h1
        className="font-semibold leading-tight"
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
        LIU
          </h1>
        </div>

        {/* reflected overlay that scales the same way (mirrored and faded) */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            right: "10%",
            top: "70%",
            transform: "translateY(-50%) scaleY(-1) scaleX(-1)",
            maxWidth: "30%",
            opacity: 0.45,
            filter: "blur(5px)",
          }}
        >
          <h1
        className="font-semibold leading-tight"
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
        RUBY
          </h1>
          <h1
        className="font-semibold leading-tight"
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
        LIU
          </h1>
        </div>
      </div>

      {/* three boxes: stacked on mobile, three columns on md+ */}
      <div className="w-[97vw] max-w-[97vw] grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[50vh] md:min-h-[70vh] mt-0 md:mt-8">
        {/* left: text box -> About (art-about) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/art-about")}
          onKeyDown={(e) => handleKeyNav(e, "/art-about")}
          className="flex items-center justify-center p-6 transform transition-transform duration-200 ease-out hover:scale-105 cursor-pointer"
        >
          <div>
        <h3 className="inline-block border border-[#C3B1A4] text-[#C3B1A4] rounded-full px-4 py-1 text-2xl font-semibold hover:bg-[#C3B1A4] hover:text-[#2C2C2C]">About</h3>
        <p className="mt-2 text-sm md:text-lg max-w-xs text-slate-300">
          Ruby Liu is an emerging artist who works in resin, mono printing and charcoal. Often using expressive mark-making and layered resin textures. Her work aims to translate inner experiences into a visual language of gesture and texture.
        </p>
          </div>
        </div>

        {/* middle: image background with overlay text -> Gallery / Prints (art-gallery) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/art-gallery")}
          onKeyDown={(e) => handleKeyNav(e, "/art-gallery")}
          className="relative rounded-xl overflow-hidden transform transition-transform duration-200 ease-out hover:scale-105 cursor-pointer min-h-[160px] md:min-h-0"
        >
          {/* desktop / landscape background */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden md:block"
            style={{ backgroundImage: "url('/main-prin.png')" }}
            aria-hidden="true"
          />
          {/* mobile / vertically stacked background (shown on small screens) */}
          <div
            className="absolute inset-0 bg-cover bg-center block md:hidden"
            style={{ backgroundImage: "url('/hands.jpeg')" }}
            aria-hidden="true"
          />
          <div className="relative h-full p-6 flex items-start bg-black/30">
            <h3 className="inline-block text-[#C3B1A4] px-4 py-1 rounded-full text-xl font-semibold border border-[#C3B1A4] hover:bg-[#C3B1A4] hover:text-[#2C2C2C]">Gallery</h3>
          </div>
        </div>

        {/* right: image background with overlay text -> Contact (art-contact) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/art-contact")}
          onKeyDown={(e) => handleKeyNav(e, "/art-contact")}
          className="relative rounded-xl overflow-hidden transform transition-transform duration-200 ease-out hover:scale-105 cursor-pointer min-h-[160px] md:min-h-0"
        >
          <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/drawing.JPG')" }}
        aria-hidden="true"
          />
          <div className="relative h-full p-6 flex items-start bg-black/30">
        <h3 className="inline-block text-[#2C2C2C] px-4 py-1 rounded-full text-xl font-semibold border border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#C3B1A4]">Contact</h3>
          </div>
        </div>
      </div>

      {/* scroll indicator: bottom center, fades as user scrolls */}
      <div
        aria-hidden="true"
        className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-10 pointer-events-none"
        style={{ opacity: indicatorOpacity, transition: "opacity 150ms linear" }}
      >
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-[#2C2C2C] animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </main>
  );
}
