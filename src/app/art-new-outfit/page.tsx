"use client";

import OutfitCanvas from "@/components/outfitCanvas";

export default function NewOutfit() {
  return (
    <main className="grid-background-bw h-[90vh] flex items-center justify-center flex-col">
      <OutfitCanvas
        titleTop="Try out a new style for me!"
        initialArtist={{ x: -120, y: 110 }}
        initialSoftware={{ x: 830, y: 110 }}
        artistTarget="/art-home"
        softwareTarget="/cv-home"
      />
    </main>
  );
}