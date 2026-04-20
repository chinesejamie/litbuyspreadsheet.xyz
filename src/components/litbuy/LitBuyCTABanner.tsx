import Link from "next/link";
import { LITBUY_CTA } from "@/content/litbuy";
import { SITE_CONFIG } from "@/lib/data";
import CouponButton from "@/components/CouponButton";

export default function LitBuyCTABanner() {
  return (
    <section className="py-14 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center p-10 sm:p-14 bg-gradient-to-br from-accent/10 via-bg-card to-bg-card border border-accent/30 rounded-2xl">
          <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
            {LITBUY_CTA.heading}
          </h2>

          <p className="text-text-secondary leading-relaxed mb-8 text-base max-w-2xl mx-auto">
            {LITBUY_CTA.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={LITBUY_CTA.primaryHref}
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors"
            >
              {LITBUY_CTA.primaryLabel}
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
      </div>
    </section>
  );
}
