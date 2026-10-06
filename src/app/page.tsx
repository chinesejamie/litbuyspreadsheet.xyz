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
    title: "LitBuy Spreadsheet 2026 — Finds, Outfits & Ordering Guide",
    description:
      "The LitBuy Spreadsheet for 2026: curated finds from Taobao, Weidian and 1688, outfit galleries and step-by-step ordering tutorials. Independent and free to browse.",
    path: "/",
    canonicalPath: "/",
    keywords: LITBUY_KEYWORDS,
  });
}

export default async function HomePage() {
  const products = await getFeaturedProducts(30);

  return <LitBuySpreadsheetPage products={products} canonicalPath="/" />;
}
