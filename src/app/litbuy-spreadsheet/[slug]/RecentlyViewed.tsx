"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProductLite } from "@/lib/productFetcher";

const STORAGE_KEY = "recentlyViewed";

interface RecentlyViewedProps {
  currentId: string;
}

/**
 * Rein clientseitige Personalisierung (localStorage). Bewusst NICHT für
 * SEO relevant — deshalb darf sie nach dem Mount nachladen.
 */
export default function RecentlyViewed({ currentId }: RecentlyViewedProps) {
  const [items, setItems] = useState<ProductLite[]>([]);

  useEffect(() => {
    let viewed: string[] = [];
    try {
      viewed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      viewed = [];
    }
    const updated = [currentId, ...viewed.filter((v) => v !== currentId)].slice(0, 20);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      /* storage blocked — ignore */
    }

    const idsToFetch = updated.filter((id) => id !== currentId).slice(0, 8);
    if (idsToFetch.length === 0) return;

    let cancelled = false;
    Promise.all(
      idsToFetch.map((id) =>
        fetch(`/api/products/${id}`)
          .then((r) => r.json())
          .then((d) => (d?.product as ProductLite | undefined) ?? null)
          .catch(() => null)
      )
    ).then((list) => {
      if (!cancelled) setItems(list.filter((p): p is ProductLite => Boolean(p)));
    });
    return () => {
      cancelled = true;
    };
  }, [currentId]);

  if (items.length === 0) return null;

  return (
    <section className="mb-16" aria-labelledby="recently-viewed-heading">
      <h2 id="recently-viewed-heading" className="font-mono text-xl font-bold uppercase mb-6">
        <span className="text-accent">Recently</span> Viewed
      </h2>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {items.map((r) => (
          <Link
            key={r._id}
            href={`/litbuy-spreadsheet/${r.slug}`}
            className="flex-shrink-0 w-[180px] sm:w-[200px] bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors group"
          >
            <div className="aspect-square bg-bg-secondary overflow-hidden">
              {r.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.images[0]}
                  alt={r.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-3">
              <h3 className="font-mono text-xs font-bold uppercase truncate mb-1">{r.name}</h3>
              <span className="text-text-secondary text-[11px] font-mono uppercase">{r.category}</span>
              <div className="mt-2">
                <span className="inline-block bg-accent text-bg-primary text-[11px] font-mono font-bold px-3 py-1.5 rounded">
                  ${r.price?.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
