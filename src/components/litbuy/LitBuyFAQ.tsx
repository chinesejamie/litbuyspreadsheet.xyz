import { LITBUY_FAQ_SECTION } from "@/content/litbuy";

export default function LitBuyFAQ() {
  return (
    <section
      id={LITBUY_FAQ_SECTION.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_FAQ_SECTION.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base">
          {LITBUY_FAQ_SECTION.lede}
        </p>

        <div className="flex flex-col gap-3">
          {LITBUY_FAQ_SECTION.items.map((faq, i) => (
            <details
              key={i}
              className="bg-bg-card border border-border rounded-xl group"
            >
              <summary className="cursor-pointer list-none p-5 flex justify-between items-center font-mono text-sm font-bold uppercase text-white gap-4">
                <span>{faq.question}</span>
                <span
                  className="text-accent text-xl group-open:rotate-45 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
