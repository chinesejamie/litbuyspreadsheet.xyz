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
    title: "LitBuy Spreadsheet 2026 — Finds, Links & Buying Guide",
    description:
      "Browse the 2026 LitBuy Spreadsheet: thousands of verified links, trusted agents and a step-by-step buying guide. Updated weekly.",
    path: "/",
    canonicalPath: "/",
    keywords: LITBUY_KEYWORDS,
  });
}

export default async function HomePage() {
  const products = await getFeaturedProducts(30);

  return <LitBuySpreadsheetPage products={products} canonicalPath="/" />;
}
