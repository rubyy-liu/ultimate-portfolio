"use client";

import React, { useState } from "react";
import MasonryGallery from "@/components/MasonryGallery";

type Item = { src: string; category: "prints" | "resin" | "mixed" | "drawing" };

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
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white">Gallery</h1>
            <p className="mt-1 text-sm text-gray-300">Filter by medium</p>
          </div>

          <div className="flex items-center gap-2">
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`text-sm font-medium px-3 py-1 rounded-full transition ${
                    active
                      ? "bg-white/10 text-white ring-1 ring-white/20"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                  aria-pressed={active}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </header>

        <MasonryGallery images={filteredImages} gap="4" wideIndices={[0, 4]} />
      </div>
    </main>
  );
}
