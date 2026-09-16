import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import { generatePageMetadata } from "@/lib/metadata";
import {
  CANONICAL_CATEGORIES,
  CATEGORY_GROUPS,
} from "@/lib/categoryGroups";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import { CATEGORY_GUIDES } from "@/content/categories";

// ISR: refresh tab counts hourly so they stay close to reality without
// hitting the DB on every request.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "LitBuy Spreadsheet — 8,000+ Verified Rep Finds & Links",
  description:
    "Browse the full LitBuy Spreadsheet: 8,000+ verified rep finds across shoes, t-shirts, hoodies, jackets, pants and more. Every link works with LitBuy.",
  path: "/litbuy-spreadsheet",
  canonicalPath: "/litbuy-spreadsheet",
  keywords: [
    "litbuy spreadsheet",
    "litbuy spreadsheet 2026",
    "litbuy finds",
    "litbuy products",
    "rep finds",
  ],
});

interface SearchParams {
  q?: string;
  category?: string;
}

interface TabData {
  name: string;
  count: number;
  href: string;
}

/**
 * Fetch per-canonical-category product counts in a single aggregation.
 * The resulting map keys on canonical names ("T-Shirts", "Shoes", …).
 * Falls back to zeros if the database is unreachable so the build
 * stays green.
 */
async function getCategoryCounts(): Promise<Record<string, number>> {
  try {
    await dbConnect();

    const total = await FindsProduct.countDocuments({
      hidden: { $ne: true },
    });

    const counts: Record<string, number> = { All: total };

    await Promise.all(
      CANONICAL_CATEGORIES.map(async (canonical) => {
        const aliases = CATEGORY_GROUPS[canonical] ?? [canonical];
        counts[canonical] = await FindsProduct.countDocuments({
          hidden: { $ne: true },
          category: { $in: aliases },
        });
      })
    );

    return counts;
  } catch (err) {
    console.error("[products/page] getCategoryCounts failed:", err);
    return {};
  }
}

/**
 * Server component — renders the breadcrumb + category tab nav in the
 * initial HTML so Google can crawl every `/products?category=X` URL as
 * a real internal link. All interactive pieces live in ProductsClient.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", category = "All" } = await searchParams;
  const counts = await getCategoryCounts();

  const tabs: TabData[] = ["All", ...CANONICAL_CATEGORIES].map((name) => {
    const params = new URLSearchParams();
    if (name !== "All") params.set("category", name);
    if (q) params.set("q", q);
    const qs = params.toString();
    return {
      name,
      count: counts[name] ?? 0,
      href: qs ? `/litbuy-spreadsheet?${qs}` : "/litbuy-spreadsheet",
    };
  });

  const activeName = CANONICAL_CATEGORIES.find(
    (n) => n.toLowerCase() === category.toLowerCase()
  )
    ? category
    : "All";

  return (
    <>
      {/* Sticky category bar — real `<Link>`s so Google can crawl every
          filter URL as an indexable page. Counts rendered server-side. */}
      <div className="sticky top-[60px] bg-glass backdrop-blur-xl z-[100] border-b border-glass-border px-5">
        <div className="max-w-6xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs uppercase tracking-wide text-text-muted py-3 flex items-center gap-2"
          >
            <Link
              href="/"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Home
            </Link>
            <span className="text-accent font-bold">&#9654;</span>
            <span className="text-text-secondary">LitBuy Spreadsheet</span>
            <span className="text-accent font-bold">&#9654;</span>
            <span className="text-accent font-bold">{activeName}</span>
          </nav>
          <nav
            aria-label="Product categories"
            className="flex overflow-x-auto hide-scrollbar relative"
          >
            {tabs.map((tab) => {
              const isActive = tab.name === activeName;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  prefetch={false}
                  className={`relative flex-1 min-w-fit py-4 px-5 font-mono text-[13px] font-black uppercase tracking-wide text-center whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-bg-primary bg-accent"
                      : "text-accent-dim hover:text-accent"
                  }`}
                >
                  <span className="relative z-10">
                    {tab.name}
                    {tab.count > 0 && (
                      <span className="ml-1.5 opacity-70 text-[11px]">
                        ({tab.count})
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <ProductsClient counts={counts} />

      {/* Serverseitig gerenderte Links auf die Kategorie-Guides — die
          indexierbaren Seiten der Domain brauchen interne Links aus dem
          meistbesuchten Browse-Screen. */}
      <section className="max-w-6xl mx-auto px-5 pb-16" aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="font-mono text-xl font-bold uppercase mb-3">
          Category <span className="text-accent">buying guides</span>
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-2xl">
          Sizing, QC photo checks and realistic budgets for each item type, with
          live listings from the spreadsheet.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/categories/${g.slug}`}
                className="group block p-4 border border-border rounded-xl hover:border-accent transition-colors"
              >
                <span className="block font-mono text-sm font-bold uppercase group-hover:text-accent transition-colors">
                  {g.canonical}
                </span>
                <span className="block text-xs text-text-secondary mt-1">{g.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
}
