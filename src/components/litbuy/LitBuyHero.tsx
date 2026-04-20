import Link from "next/link";
import { LITBUY_HERO, LITBUY_PAGE } from "@/content/litbuy";
import { SITE_CONFIG } from "@/lib/data";
import CouponButton from "@/components/CouponButton";

export default function LitBuyHero() {
  // H1 text is split so the year "2026" can be highlighted with the accent color.
  // We keep the H1 as a single element to preserve the one-H1-per-page rule.
  const h1Text = LITBUY_PAGE.h1;
  const yearMatch = h1Text.match(/^(.*?)(2026)(.*)$/);
  const beforeYear = yearMatch ? yearMatch[1] : h1Text;
  const afterYear = yearMatch ? yearMatch[3] : "";

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-16 text-center">
      <div
        className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(255,227,77,0.10)_0%,transparent_65%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-[clamp(32px,7vw,64px)] font-extrabold uppercase leading-[1.05] tracking-tight mb-6">
          {beforeYear}
          <span className="text-accent">2026</span>
          {afterYear}
        </h1>

        <p className="text-xl sm:text-2xl text-text-secondary mb-6 font-bold">
          {LITBUY_HERO.subheading}
        </p>

        <p className="max-w-2xl mx-auto text-text-secondary mb-8 leading-relaxed">
          {LITBUY_HERO.lede}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Link
            href={LITBUY_HERO.primaryCtaHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 text-white font-mono text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            {LITBUY_HERO.primaryCtaLabel}
          </Link>

          <CouponButton
            href={SITE_CONFIG.litbuyInvite}
            label="70% Off Shipping"
            subLabel="LitBuy"
            external
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
