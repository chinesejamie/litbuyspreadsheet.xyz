"use client";

import { useAutoScroll } from "@/hooks/useAutoScroll";
import { LITBUY_BRANDS_COPY } from "@/content/litbuy";
import type { BrandLite } from "@/lib/productFetcher";

interface LitBuyBrandsCarouselProps {
  brands: BrandLite[];
}

export default function LitBuyBrandsCarousel({
  brands,
}: LitBuyBrandsCarouselProps) {
  const scrollRef = useAutoScroll(0.45);

  // Fallback to the static brand name list from the content module when DB is empty
  const brandList =
    brands.length > 0
      ? brands
      : LITBUY_BRANDS_COPY.topBrands.map((name, i) => ({
          _id: `fallback-${i}`,
          name,
          logo: "",
          instagram: "#",
        }));

  return (
    <section
      id={LITBUY_BRANDS_COPY.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
            {LITBUY_BRANDS_COPY.heading.split("LitBuy").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-accent">LitBuy</span>
                )}
              </span>
            ))}
          </h2>
          <p className="text-text-secondary leading-relaxed text-base max-w-3xl">
            {LITBUY_BRANDS_COPY.lede}
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
          style={{ scrollBehavior: "auto" }}
        >
          {brandList.map((brand) => (
            <a
              key={brand._id}
              href={brand.instagram || "#"}
              target={brand.instagram && brand.instagram !== "#" ? "_blank" : undefined}
              rel={brand.instagram && brand.instagram !== "#" ? "noopener noreferrer" : undefined}
              className="flex-shrink-0 w-[140px] sm:w-[160px] bg-bg-card border border-border rounded-xl p-5 text-center hover:border-accent/30 transition-colors group cursor-pointer"
            >
              <div className="w-16 h-16 bg-bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3 overflow-hidden group-hover:bg-accent/10 transition-colors">
                {brand.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo — LitBuy Spreadsheet brand`}
                    loading="lazy"
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="font-mono text-lg font-bold text-text-muted group-hover:text-accent transition-colors">
                    {brand.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-mono text-xs font-bold uppercase truncate text-white">
                {brand.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
