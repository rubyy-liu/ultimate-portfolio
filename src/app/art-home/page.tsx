"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const handleKeyNav = (e: React.KeyboardEvent, path: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(path);
    }
  };

  return (
    <main className="bg-[#2C2C2C] flex items-center justify-center flex-col pb-8">
      <div className="relative max-w-[97vw] w-full flex items-center justify-center">
        <img
          src="/main.jpg"
          alt="Art Home Background"
          className="max-h-[90vh] w-[97vw] rounded-2xl object-cover shadow-lg block art-image"
        />

        {/* overlay title on the right side */}
        <div className="absolute right-100 top-1/4 -translate-y-1/2 max-w-xs p-4">
          <h1 className="text-8xl font-semibold leading-tight">RUBY</h1>
          <h1 className="text-8xl font-semibold leading-tight">LIU</h1>
        </div>

        <div
          className="absolute right-50 top-3/4 -translate-y-1/2 max-w-xs p-4 backdrop-blur-xs filter blur-xs"
          style={{ transform: 'scaleY(-1) scaleX(-1)' }}
        >
          <h1 className="text-8xl font-semibold leading-tight">RUBY</h1>
          <h1 className="text-8xl font-semibold leading-tight">LIU</h1>
        </div>
      </div>

      {/* three evenly divided boxes underneath the image/title */}
      <div className="w-[97vw] max-w-[97vw] mt-8 grid grid-cols-3 gap-4">
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
            <p className="mt-2 text-lg max-w-xs text-slate-300">
              Ruby Liu is an emerging artist who works in resin, mono printing and charcoal. Using expressive mark-making and layered resin textures, she captures the movement and depth of human feeling. Aiming to translate inner experiences into a visual language of gesture and texture.
            </p>
          </div>
        </div>

        {/* middle: image background with overlay text -> Gallery / Prints (art-gallery) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/art-gallery")}
          onKeyDown={(e) => handleKeyNav(e, "/art-gallery")}
          className="relative rounded-xl overflow-hidden transform transition-transform duration-200 ease-out hover:scale-105 cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/main-print.png')" }}
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
          className="relative h-160 rounded-xl overflow-hidden transform transition-transform duration-200 ease-out hover:scale-105 cursor-pointer"
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
    </main>
  );
}
