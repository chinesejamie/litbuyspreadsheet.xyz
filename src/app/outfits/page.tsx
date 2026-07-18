import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, itemListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { OUTFIT_GUIDES } from "@/content/outfits";

export const metadata: Metadata = generatePageMetadata({
  title: "Reps Outfit Guides 2026 — Streetwear, Techwear, Y2K, Old Money & More",
  description:
    "Five complete reps outfit guides built from the LitBuy Spreadsheet. Streetwear, techwear, Y2K, old money and minimalist looks with verified Taobao and Weidian links.",
  path: "/outfits",
  canonicalPath: "/outfits",
  keywords: [
    "reps outfit guide",
    "rep outfit",
    "streetwear reps outfit",
    "techwear reps outfit",
    "y2k reps outfit",
    "old money reps",
    "minimalist reps outfit",
    "litbuy outfit",
  ],
});

const schemas = [
  breadcrumbListSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Outfit Guides", url: absoluteUrl("/outfits") },
  ]),
  itemListSchema(
    OUTFIT_GUIDES.map((g) => ({
      name: g.h1,
      url: absoluteUrl(`/outfits/${g.slug}`),
    }))
  ),
];

export default function OutfitsPage() {
  return (
    <>
      <SchemaScript schema={schemas} id="outfits-hub-schema" />
      <main className="min-h-[70vh] px-6 py-16 max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-text-primary">Outfit Guides</li>
          </ol>
        </nav>

        <header className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            /outfits
          </div>
          <h1 className="text-[clamp(36px,7vw,64px)] font-black uppercase leading-none tracking-tight mb-5">
            Reps Outfit <span className="text-accent">Guides</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            Five complete outfit blueprints built from the LitBuy Spreadsheet. Each
            guide breaks down the pieces, sizing notes, what to verify in QC photos
            and the realistic budget — so you can build a look in a single LitBuy
            haul instead of guessing.
          </p>
        </header>

        <section aria-label="Outfit guides">
          <ul className="grid gap-4 sm:grid-cols-2">
            {OUTFIT_GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/outfits/${g.slug}`}
                  className="group block p-6 border border-border rounded-xl hover:border-accent transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
                    {g.pieces.length} pieces
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {g.h1}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {g.tagline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 p-6 border border-border rounded-xl bg-bg-secondary/30">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-3">
            Building a haul from scratch?
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            If you have not ordered through a shopping agent before, start with our
            step-by-step <Link href="/tutorial" className="text-accent hover:underline">LitBuy ordering tutorial</Link>.
            It walks through account setup, finding products in the spreadsheet,
            getting QC photos and consolidated shipping — about 12 minutes end to end.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Already know what you want? Browse the full{" "}
            <a
              href="https://lit-buy-spreadsheet.com/litbuy-spreadsheet"
              target="_blank"
              rel="noopener"
              className="text-accent hover:underline"
            >
              LitBuy Spreadsheet
            </a>{" "}
            with 10,000+ verified listings.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
