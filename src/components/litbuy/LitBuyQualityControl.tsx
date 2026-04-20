import { LITBUY_QUALITY_CONTROL } from "@/content/litbuy";

export default function LitBuyQualityControl() {
  return (
    <section
      id={LITBUY_QUALITY_CONTROL.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_QUALITY_CONTROL.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base max-w-3xl">
          {LITBUY_QUALITY_CONTROL.lede}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LITBUY_QUALITY_CONTROL.tips.map((tip, i) => (
            <article
              key={i}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-colors"
            >
              <h3 className="font-mono text-sm font-bold uppercase mb-2 text-accent">
                {tip.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {tip.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
