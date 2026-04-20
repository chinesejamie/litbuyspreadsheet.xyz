import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Outfits — Coming Soon | LitBuy Spreadsheet",
  description: "Curated LitBuy outfit inspiration is coming soon. Browse full-look rep fashion sets built from the LitBuy Spreadsheet.",
  path: "/outfits",
  canonicalPath: "/outfits",
  noindex: true,
});

export default function OutfitsPage() {
  return (
    <>
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
            /outfits
          </div>
          <h1 className="text-[clamp(36px,8vw,72px)] font-black uppercase leading-none tracking-tight mb-6">
            Coming <span className="text-accent">Soon</span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-md mx-auto">
            Outfit inspiration is on its way. We're curating full-look LitBuy Spreadsheet fits you can recreate in a single haul.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-bg-primary font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors"
          >
            Back to LitBuy Spreadsheet
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
