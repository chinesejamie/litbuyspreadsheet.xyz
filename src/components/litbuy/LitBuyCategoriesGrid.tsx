"use client";

import Link from "next/link";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { LITBUY_CATEGORIES_COPY } from "@/content/litbuy";
import { CATEGORY_IMAGES } from "@/lib/categoryImages";

export default function LitBuyCategoriesGrid() {
  const scrollRef = useAutoScroll(0.35);

  return (
    <section
      id={LITBUY_CATEGORIES_COPY.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
            <span className="text-accent">LitBuy</span> Spreadsheet Product
            Categories
          </h2>
          <p className="text-text-secondary leading-relaxed text-base max-w-3xl">
            {LITBUY_CATEGORIES_COPY.lede}
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 mb-8"
          style={{ scrollBehavior: "auto" }}
        >
          {LITBUY_CATEGORIES_COPY.items.map((cat) => {
            // Pass the canonical category name straight through — the
            // /products page + /api/products expand it via categoryGroups.
            // Image lookup still uses Micky's legacy CATEGORY_IMAGES map
            // which keys on "Tshirts" (no hyphen), so resolve that here.
            const imageKey =
              cat.name === "T-Shirts" ? "Tshirts" : cat.name;
            const image = CATEGORY_IMAGES[imageKey];
            return (
              <Link
                key={cat.name}
                href={`/litbuy-spreadsheet?category=${encodeURIComponent(cat.name)}`}
                className="flex-shrink-0 w-[160px] bg-bg-card border border-border rounded-xl overflow-hidden text-center hover:border-accent/30 transition-colors group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                <div className="w-full h-[120px] bg-bg-elevated flex items-center justify-center overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`${cat.name} on the LitBuy Spreadsheet`}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-8 h-8 text-text-muted"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )}
                </div>
                <div className="p-3 relative z-10">
                  <h3 className="font-mono text-sm font-bold uppercase text-white">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {LITBUY_CATEGORIES_COPY.items.map((cat) => (
            <article
              key={`${cat.name}-copy`}
              className="bg-bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-mono text-sm font-bold uppercase mb-2 text-accent">
                {cat.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {cat.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
