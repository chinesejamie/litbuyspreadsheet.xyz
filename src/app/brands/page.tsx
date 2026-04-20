import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Brands — Coming Soon | LitBuy Spreadsheet",
  description:
    "Brand directory is coming soon. Browse the LitBuy Spreadsheet for verified product links while we finalise the brand index.",
  path: "/brands",
  canonicalPath: "/brands",
  noindex: true,
});

export default function BrandsPage() {
  return (
    <>
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
            /brands
          </div>
          <h1 className="text-[clamp(36px,8vw,72px)] font-black uppercase leading-none tracking-tight mb-6">
            Coming <span className="text-accent">Soon</span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-md mx-auto">
            Our full brand directory is on its way. In the meantime, every
            verified find is indexed on the LitBuy Spreadsheet — jump back to
            keep browsing.
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
