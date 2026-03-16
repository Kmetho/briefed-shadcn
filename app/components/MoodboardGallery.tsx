"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function MoodboardGallery({ urls }: { urls: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {urls.map((url, i) => (
          <button
            key={i}
            onClick={() => setSelected(url)}
            className="relative aspect-square overflow-hidden rounded-md border border-border shadow-sm hover:opacity-80 transition-opacity cursor-zoom-in"
          >
            <Image
              src={url}
              alt={`Moodboard ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white hover:text-white/80"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={selected}
            alt="Moodboard enlarged"
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
