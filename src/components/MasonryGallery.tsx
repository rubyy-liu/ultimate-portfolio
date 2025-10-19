import React from "react";

type MasonryGalleryProps = {
  images?: string[];
  gap?: string; // Tailwind spacing (e.g., "4" -> 1rem)
  wideIndices?: number[]; // indices of images that should span 2 columns on larger screens
};

export default function MasonryGallery({
  images = [
    "art5.png",
    "art6.png",
    "art3.png",
    "side-view.JPG",
    "art7.png",
    "IMG_0799.JPG",
    "art4.png",
    "tree.png",
    "art2.png",
    "scream.png",
    "IMG_9425.JPG",
    "art1.png",
  ],
  gap = "4",
  wideIndices = [0, 4], // default: make the first and fifth image wide
}: MasonryGalleryProps) {
  return (
    <section className="mx-auto px-4" aria-label="Gallery">
      {/* switch to responsive CSS grid so some items can span 2 columns */}
      <div
        className={`grid gap-${gap} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        style={{ rowGap: `${parseInt(gap) * 0.25}rem`, columnGap: `${parseInt(gap) * 0.25}rem` }}
      >
        {images.map((img, idx) => {
          const isWide = wideIndices.includes(idx);
          // apply col-span on large screens only (so layout remains single/2-col on small)
          const spanClass = isWide ? "lg:col-span-2" : "";
          return (
            <figure
              key={img}
              className={`${spanClass} overflow-hidden rounded-lg relative group`}
              role="group"
            >
              {/* wrapper gives a consistent min-height so small images still look good */}
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src={`/${img}`}
                  alt={img.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full block object-cover transform transition-transform duration-200 ease-out group-hover:scale-105"
                  style={{ minHeight: 140 }}
                />
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}