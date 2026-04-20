import LitBuyHero from "./LitBuyHero";
import LitBuyWhatIs from "./LitBuyWhatIs";
import LitBuyHowToUse from "./LitBuyHowToUse";
import LitBuyCategoriesGrid from "./LitBuyCategoriesGrid";
import LitBuyComparisonTable from "./LitBuyComparisonTable";
import LitBuyQualityControl from "./LitBuyQualityControl";
import LitBuyShippingAgents from "./LitBuyShippingAgents";
import LitBuyTopProductsCarousel from "./LitBuyTopProductsCarousel";
import LitBuyHowToOrder from "./LitBuyHowToOrder";
import LitBuyTrustSignals from "./LitBuyTrustSignals";
import LitBuyFAQ from "./LitBuyFAQ";
import LitBuyCTABanner from "./LitBuyCTABanner";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaScript } from "@/components/seo/SchemaScript";
import {
  webPageSchema,
  faqPageSchema,
  itemListSchema,
} from "@/lib/schema";
import { absoluteUrl, canonicalFor } from "@/lib/seo";
import {
  LITBUY_FAQ,
  LITBUY_LAST_UPDATED,
  LITBUY_PAGE,
} from "@/content/litbuy";
import type { ProductLite } from "@/lib/productFetcher";

interface LitBuySpreadsheetPageProps {
  products: ProductLite[];
  /** Path used as canonical — always "/" for both the root and /litbuy-spreadsheet route */
  canonicalPath?: string;
}

export default function LitBuySpreadsheetPage({
  products,
  canonicalPath = "/",
}: LitBuySpreadsheetPageProps) {
  const canonicalUrl = canonicalFor(canonicalPath);

  // Build the schema graph from the single source of truth in src/content/litbuy.ts.
  // Organization + WebSite are already emitted in the root layout, so do not duplicate them here.
  const schemas: object[] = [
    webPageSchema({
      url: canonicalUrl,
      name: LITBUY_PAGE.h1,
      description:
        "Complete 2026 guide to the LitBuy Spreadsheet: 10,000+ verified product links, trusted shipping agents, quality control tips, FAQ and step-by-step buying tutorial via LitBuy.",
      dateModified: LITBUY_LAST_UPDATED,
    }),
    faqPageSchema(LITBUY_FAQ),
  ];

  // Only include ItemList schema when products are actually available
  if (products.length > 0) {
    schemas.push(
      itemListSchema(
        products.slice(0, 20).map((p) => ({
          name: p.name,
          url: absoluteUrl(`/litbuy-spreadsheet/${p.slug}`),
          image: p.mainImage || p.images?.[0],
          price: p.price,
          // OOPBUY schema has no brand field — creatorName is the closest
          // analogue (spreadsheet curator who listed the product).
          brand: p.creatorName,
        }))
      )
    );
  }

  return (
    <>
      <SchemaScript schema={schemas} id="litbuy" />

      <LitBuyHero />

      <div className="max-w-6xl mx-auto px-6 pt-4">
        <Breadcrumbs items={LITBUY_PAGE.breadcrumbs} />
      </div>

      <LitBuyWhatIs />
      <LitBuyHowToUse />
      <LitBuyCategoriesGrid />
      <LitBuyComparisonTable />
      <LitBuyQualityControl />
      <LitBuyShippingAgents />
      <LitBuyTopProductsCarousel products={products} />
      <LitBuyHowToOrder />
      <LitBuyTrustSignals />
      <LitBuyFAQ />
      <LitBuyCTABanner />

      <Footer />
    </>
  );
}
