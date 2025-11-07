"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

type Item = { src: string; category: "prints" | "resin" | "mixed" | "drawing" };

// dynamically load MasonryGallery on the client and show a loading fallback
const MasonryGallery = dynamic(() => import("@/components/MasonryGallery"), {
  ssr: false,
  loading: () => <GallerySkeleton />,
});

function GallerySkeleton() {
  // simple skeleton: responsive grid of pulsing tiles
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-40 sm:h-48 bg-white/6 rounded-md animate-pulse border border-white/6"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function Gallery() {
  const allImages: Item[] = [
    { src: "art5.png", category: "prints" },
    { src: "art6.png", category: "mixed" },
    { src: "art3.png", category: "prints" },
    { src: "side-view.JPG", category: "mixed" },
    { src: "art7.png", category: "drawing" },
    { src: "IMG_0799.JPG", category: "resin" },
    { src: "art4.png", category: "prints" },
    { src: "tree.png", category: "mixed" },
    { src: "art2.png", category: "prints" },
    { src: "scream.png", category: "mixed" },
    { src: "IMG_9425.JPG", category: "drawing" },
    { src: "art1.png", category: "prints" },
    { src: "hands.jpeg", category: "drawing" },
    { src: "handres.jpeg", category: "mixed" },
  ];

  const [filter, setFilter] = useState<"all" | Item["category"]>("all");

  const filters: { key: typeof filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "drawing", label: "Drawing" },
    { key: "prints", label: "Prints" },
    { key: "resin", label: "Resin" },
    { key: "mixed", label: "Mixed Media" },
  ];

  const filteredImages = allImages
    .filter((it) => filter === "all" || it.category === filter)
    .map((it) => it.src);

  return (
    <main className="bg-[#2C2C2C] min-h-screen pb-5">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#FAE9DD]">Gallery</h1>
            <p className="mt-1 text-sm text-slate-300">Filter by medium</p>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {/* Mobile: compact select control */}
            <div className="sm:hidden w-full">
              <label className="sr-only">Filter</label>
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | Item["category"])
                }
                className="w-full bg-[#1f1f1f] text-sm text-slate-300 px-3 py-2 rounded-md"
              >
                {filters.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: pill buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`text-sm font-medium px-3 py-1 rounded-full transition ${
                      active
                        ? "bg-white/10 text-[#FAE9DD] ring-1 ring-white/20"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                    aria-pressed={active}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <MasonryGallery images={filteredImages} gap="4" wideIndices={[0, 4]} />
      </div>
    </main>
  );
}
