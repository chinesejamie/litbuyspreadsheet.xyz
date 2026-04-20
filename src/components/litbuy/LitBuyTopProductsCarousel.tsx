"use client";

import Link from "next/link";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import type { ProductLite } from "@/lib/productFetcher";

interface LitBuyTopProductsCarouselProps {
  products: ProductLite[];
}

export default function LitBuyTopProductsCarousel({
  products,
}: LitBuyTopProductsCarouselProps) {
  const scrollRef = useAutoScroll(0.4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="litbuy-top-finds"
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
            Top <span className="text-accent">LitBuy</span> Finds Right Now
          </h2>
          <p className="text-text-secondary leading-relaxed text-base max-w-3xl">
            Hand-picked finds from the LitBuy Spreadsheet that are trending
            right now. Every product below is indexed on our grid and ready to
            order through LitBuy in one click.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
          style={{ scrollBehavior: "auto" }}
        >
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/litbuy-spreadsheet/${product.slug}`}
              className="flex-shrink-0 w-[200px] sm:w-[220px] bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors group"
            >
              <div className="aspect-square bg-bg-secondary relative overflow-hidden">
                {product.mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.mainImage}
                    alt={`${product.name} — LitBuy Spreadsheet find`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-8 h-8"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-mono text-xs font-bold uppercase truncate mb-2 text-white">
                  {product.name}
                </h3>
                <span className="inline-block bg-accent text-bg-primary text-[11px] font-mono font-bold px-3 py-1.5 rounded">
                  $ {product.price?.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/litbuy-spreadsheet"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors"
          >
            Browse All LitBuy Finds
          </Link>
        </div>
      </div>
    </section>
  );
}
