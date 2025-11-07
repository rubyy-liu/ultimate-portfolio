"use client";
import OutfitCanvas from "@/components/outfitCanvas";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');`}</style>
      <main className="grid-background h-[100vh] flex items-center justify-center flex-col">
        <div className="text-center">
          <h2 className="nothing-you-could-do-regular text-4xl mb-1">Hi I&apos;m Ruby</h2>
          <h2 className="nothing-you-could-do-regular text-2xl mb-10 lg:hidden">Select your desired skill set</h2>

            <div className="hidden md:block">
            <OutfitCanvas
              titleTop="Could you please complete my outfit?"
              initialArtist={{ x: -120, y: 110 }}
              initialSoftware={{ x: 830, y: 110 }}
              artistTarget="/art-home"
              softwareTarget="/cv-home"
              artistSub="Artist"
              softwareSub="Software Developer"
            />
            </div>

            {/* Tablet & Mobile: show static image instead of canvas */}
            <div className="md:hidden flex items-center justify-center">
            <img
              src="/comRuby.png"
              alt="Ruby"
              className="w-48 sm:w-64 h-auto"
            />
            </div>

          {/* Mobile: two buttons under the ruby (only visible on small screens) */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:hidden">
            <button
              onClick={() => router.push("/art-home")}
              aria-label="Go to Art Home"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E0D9D3] text-[#2C2C2C] font-medium hover:opacity-90 transition"
            >
              Artist - View Gallery
            </button>

            <button
              onClick={() => router.push("/cv-home")}
              aria-label="Go to CV Home"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#A6E1FF] bg-white text-[#2C2C2C] font-medium hover:opacity-90 transition"
            >
              Software - View CV
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
