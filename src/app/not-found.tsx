import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { CATEGORY_GUIDES } from "@/content/categories";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <main className="min-h-[60vh] px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
          404
        </div>
        <h1 className="text-[clamp(32px,7vw,60px)] font-black uppercase leading-none tracking-tight mb-5">
          That page is <span className="text-accent">not here</span>
        </h1>
        <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-md mx-auto">
          Product listings rotate as sellers change stock, so older product
          links sometimes stop working. Pick a category below or search the
          full spreadsheet.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/litbuy-spreadsheet"
            className="inline-flex items-center px-7 py-3 bg-accent text-bg-primary font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors"
          >
            Search the spreadsheet
          </Link>
          <Link
            href="/tutorial"
            className="inline-flex items-center px-7 py-3 border border-border font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:border-accent hover:text-accent transition-colors"
          >
            Read the tutorial
          </Link>
        </div>
        <nav aria-label="Browse categories">
          <ul className="flex flex-wrap justify-center gap-2">
            {CATEGORY_GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/categories/${g.slug}`}
                  className="inline-block px-3 py-1.5 bg-bg-card border border-border rounded-lg font-mono text-[11px] uppercase text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {g.canonical}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Footer />
    </>
  );
}
