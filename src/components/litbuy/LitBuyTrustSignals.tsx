import { LITBUY_TRUST_SIGNALS } from "@/content/litbuy";

export default function LitBuyTrustSignals() {
  return (
    <section
      id={LITBUY_TRUST_SIGNALS.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-10">
          {LITBUY_TRUST_SIGNALS.heading}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {LITBUY_TRUST_SIGNALS.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-bg-card border border-border rounded-xl p-5 text-center"
            >
              <div className="text-3xl font-black text-accent">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-text-secondary uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <figure className="bg-bg-card border border-border rounded-xl p-6 mb-10">
          <figcaption className="font-mono text-sm font-bold uppercase text-accent mb-2">
            Curated by {LITBUY_TRUST_SIGNALS.author}
          </figcaption>
          <p className="text-text-secondary text-sm leading-relaxed">
            {LITBUY_TRUST_SIGNALS.authorBio}
          </p>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LITBUY_TRUST_SIGNALS.testimonials.map((testimonial, i) => (
            <figure
              key={i}
              className="bg-bg-card border border-border rounded-xl p-6 flex flex-col"
            >
              <blockquote className="text-text-secondary text-sm leading-relaxed italic mb-4 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto">
                <div className="text-white font-semibold text-sm">
                  {testimonial.author}
                </div>
                <div className="text-text-muted text-xs font-mono uppercase mt-0.5">
                  {testimonial.context}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
