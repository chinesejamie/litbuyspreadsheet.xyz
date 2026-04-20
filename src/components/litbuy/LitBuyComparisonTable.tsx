import { LITBUY_COMPARISON } from "@/content/litbuy";

export default function LitBuyComparisonTable() {
  const headers = ["Feature", ...LITBUY_COMPARISON.columns];

  return (
    <section
      id={LITBUY_COMPARISON.anchor}
      className="py-14 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-4">
          {LITBUY_COMPARISON.heading}
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10 text-base max-w-3xl">
          {LITBUY_COMPARISON.lede}
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-bg-elevated">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3 font-mono text-xs uppercase text-text-secondary border-b border-border"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LITBUY_COMPARISON.rows.map((row, i) => (
                <tr key={i} className="bg-bg-card">
                  <td className="px-4 py-3 text-sm border-b border-border text-white font-semibold">
                    {row.feature}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-border text-accent font-medium">
                    {row.litbuy}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-border text-text-secondary">
                    {row.pandabuy}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-border text-text-secondary">
                    {row.kakobuy}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-border text-text-secondary">
                    {row.cssbuy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
