import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { getCategoryCounts } from "@/lib/productFetcher";
import { CATEGORY_GUIDES } from "@/content/categories";

// Counts refresh hourly; the editorial part is static.
export const revalidate = 3600;

const PAGE_DATE = "2026-09-16";

export const metadata: Metadata = generatePageMetadata({
  title: "LitBuy Spreadsheet Categories — Buying Guides for Every Item",
  description:
    "Ten category buying guides for the LitBuy Spreadsheet: shoes, tees, hoodies, jackets, pants, tracksuits, jerseys, accessories and more. Sizing, QC checks and live listings.",
  path: "/categories",
  canonicalPath: "/categories",
  keywords: [
    "litbuy categories",
    "litbuy spreadsheet categories",
    "rep categories litbuy",
    "litbuy buying guide",
  ],
});

export default async function CategoriesHubPage() {
  const counts = await getCategoryCounts(CATEGORY_GUIDES.map((g) => g.canonical));

  const schemas = [
    webPageSchema({
      url: absoluteUrl("/categories"),
      name: "LitBuy Spreadsheet Categories",
      description:
        "Category buying guides for the LitBuy Spreadsheet with sizing, QC and budget notes plus live listings.",
      dateModified: PAGE_DATE,
    }),
    breadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Categories", url: absoluteUrl("/categories") },
    ]),
    itemListSchema(
      CATEGORY_GUIDES.map((g) => ({
        name: g.canonical,
        url: absoluteUrl(`/categories/${g.slug}`),
      }))
    ),
  ];

  return (
    <>
      <SchemaScript schema={schemas} id="categories-hub-schema" />
      <div className="px-6 py-14 max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>

        <header className="mb-12 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            /categories
          </div>
          <h1 className="text-[clamp(34px,7vw,60px)] font-black uppercase leading-none tracking-tight mb-5">
            LitBuy Spreadsheet <span className="text-accent">Categories</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Every category on the LitBuy Spreadsheet has its own buying guide:
            how sizing runs for that item type, what to check in QC photos,
            what a fair price looks like after conversion from CNY, and which
            marketplace the best sellers live on. Each guide ends with live
            listings from the spreadsheet database.
          </p>
        </header>

        <section aria-label="Category guides">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {CATEGORY_GUIDES.map((g) => {
              const count = counts[g.canonical];
              return (
                <li key={g.slug}>
                  <Link
                    href={`/categories/${g.slug}`}
                    className="group flex flex-col h-full bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
                  >
                    <div className="h-[150px] bg-bg-elevated flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.image}
                        alt={`${g.canonical} on the LitBuy Spreadsheet`}
                        loading="lazy"
                        width={300}
                        height={150}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <h2 className="font-mono text-base font-black uppercase group-hover:text-accent transition-colors">
                        {g.canonical}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed flex-1">
                        {g.tagline}
                      </p>
                      <p className="font-mono text-[11px] uppercase text-text-muted">
                        {typeof count === "number" && count > 0
                          ? `${count.toLocaleString("en-US")} listings`
                          : "Live listings"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16 p-6 border border-border rounded-xl bg-bg-secondary/30 max-w-3xl">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-3">
            Not sure where to start?
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            First-time buyers usually do best with a hoodie or a pair of shoes
            plus a tee or two as filler. Read the{" "}
            <Link href="/tutorial/first-haul-checklist" className="text-accent hover:underline">
              first haul checklist
            </Link>{" "}
            before ordering, or pick a complete look from the{" "}
            <Link href="/outfits" className="text-accent hover:underline">
              outfit guides
            </Link>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
