import { LITBUY_HOW_TO } from "@/content/litbuy";

export default function LitBuyHowToUse() {
  return (
    <section
      id={LITBUY_HOW_TO.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_HOW_TO.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base">
          {LITBUY_HOW_TO.description}
        </p>

        <ol className="flex flex-col gap-4 list-none p-0">
          {LITBUY_HOW_TO.steps.map((step, i) => (
            <li
              key={i}
              className="bg-bg-card border border-border rounded-xl p-6 flex gap-5 items-start hover:border-accent/20 transition-colors"
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-mono text-lg font-bold shrink-0 text-bg-primary">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-[15px] font-bold uppercase mb-2 text-white">
                  {step.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
