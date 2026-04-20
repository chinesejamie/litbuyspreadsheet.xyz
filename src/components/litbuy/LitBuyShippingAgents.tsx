import { LITBUY_SHIPPING_AGENTS } from "@/content/litbuy";

export default function LitBuyShippingAgents() {
  return (
    <section
      id={LITBUY_SHIPPING_AGENTS.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_SHIPPING_AGENTS.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base">
          {LITBUY_SHIPPING_AGENTS.lede}
        </p>

        <div className="flex flex-col gap-4">
          {LITBUY_SHIPPING_AGENTS.agents.map((agent, i) => (
            <article
              key={agent.name}
              className={`bg-bg-card border rounded-xl p-6 ${
                i === 0 ? "border-accent/40" : "border-border"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-1">
                {agent.name}
              </h3>
              <p className="text-accent text-sm italic mb-3">
                {agent.tagline}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {agent.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
