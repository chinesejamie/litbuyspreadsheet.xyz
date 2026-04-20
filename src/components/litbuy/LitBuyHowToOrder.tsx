import Link from "next/link";
import { LITBUY_ORDER_STEPS } from "@/content/litbuy";
import { SITE_CONFIG } from "@/lib/data";

export default function LitBuyHowToOrder() {
  return (
    <section
      id={LITBUY_ORDER_STEPS.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_ORDER_STEPS.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base">
          {LITBUY_ORDER_STEPS.lede}
        </p>

        <ol className="flex flex-col gap-4 list-none p-0">
          {LITBUY_ORDER_STEPS.steps.map((step, i) => (
            <li
              key={i}
              className="bg-bg-card border border-border rounded-xl p-6 flex gap-5 items-start hover:border-accent/20 transition-colors"
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-mono text-lg font-bold shrink-0 text-bg-primary">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-[15px] font-bold uppercase mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.body}
                </p>

                {step.ctaType === "litbuy" && step.cta && (
                  <a
                    href={SITE_CONFIG.litbuyInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-primary font-mono text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-accent-hover transition-colors mt-3"
                  >
                    {step.cta}
                  </a>
                )}

                {step.ctaType === "products" && step.cta && (
                  <Link
                    href="/litbuy-spreadsheet"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-primary font-mono text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-accent-hover transition-colors mt-3"
                  >
                    {step.cta}
                  </Link>
                )}

                {step.ctaType === "community" && step.cta && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href={SITE_CONFIG.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5865f2] hover:bg-[#4752c4] text-white font-mono text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      Join Discord
                    </a>
                    <a
                      href={SITE_CONFIG.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0088cc] hover:bg-[#006da3] text-white font-mono text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      Join Telegram
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
