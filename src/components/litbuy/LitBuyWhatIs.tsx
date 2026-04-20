import { LITBUY_WHAT_IS } from "@/content/litbuy";

export default function LitBuyWhatIs() {
  return (
    <section
      id={LITBUY_WHAT_IS.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-8">
          What Is the <span className="text-accent">LitBuy</span> Spreadsheet?
        </h2>

        {LITBUY_WHAT_IS.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-text-secondary leading-relaxed mb-5 text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
