import type { Metadata } from "next";
import LitBuySpreadsheetPage from "@/components/litbuy/LitBuySpreadsheetPage";
import { generatePageMetadata } from "@/lib/metadata";
import { getFeaturedProducts } from "@/lib/productFetcher";
import { LITBUY_KEYWORDS } from "@/content/litbuy";

// ISR: regenerate this page every hour so product lists stay fresh without blowing up
// the build. Both `/` and `/litbuy-spreadsheet` use the same cadence.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: "LitBuy Reps Guide 2026 — Outfits, Tutorials & Curated Finds",
    description:
      "The editorial guide to shopping reps in 2026: outfit galleries, step-by-step ordering tutorials, agent comparisons and curated finds from the LitBuy Spreadsheet.",
    path: "/",
    canonicalPath: "/",
    keywords: LITBUY_KEYWORDS,
  });
}

export default async function HomePage() {
  const products = await getFeaturedProducts(30);

  return <LitBuySpreadsheetPage products={products} canonicalPath="/" />;
}
