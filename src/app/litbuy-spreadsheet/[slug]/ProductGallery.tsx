"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/**
 * Bildergalerie mit Thumbnail-Auswahl. Das Hauptbild steht im initialen
 * HTML (kein Fade-Mount), damit LCP und Bild-Indexierung nicht am Client-JS
 * hängen.
 */
export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);
  const main = images[current] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square bg-bg-card rounded-xl overflow-hidden">
        {main ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={main}
            alt={`${name} — product photo ${current + 1} of ${images.length}`}
            width={800}
            height={800}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted font-mono text-xs uppercase">
            No image available
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar" role="list">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              role="listitem"
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === current}
              onClick={() => setCurrent(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-200 ${
                i === current
                  ? "border-accent scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" width={64} height={64} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
