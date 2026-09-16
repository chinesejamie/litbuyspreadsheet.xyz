import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getDescribedProducts } from "@/lib/productFetcher";
import {
  isIndexableProduct,
  MIN_INDEXABLE_DESCRIPTION_CHARS,
} from "@/lib/productQuality";
import { OUTFIT_GUIDES } from "@/content/outfits";
import { TUTORIAL_PAGES } from "@/content/tutorials";
import { CATEGORY_GUIDES } from "@/content/categories";

// Revalidate daily so newly described products get picked up without a rebuild.
export const revalidate = 86400;

// Feste Daten für statische Seiten — `new Date()` würde Google bei jedem
// Revalidate eine Änderung vorgaukeln.
const CONTENT_DATE = new Date("2026-09-16");
const GUIDE_DATE = new Date("2026-04-28");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/categories"), lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/litbuy-spreadsheet"), lastModified: CONTENT_DATE, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/outfits"), lastModified: GUIDE_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/tutorial"), lastModified: GUIDE_DATE, changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_GUIDES.map((g) => ({
    url: absoluteUrl(`/categories/${g.slug}`),
    lastModified: CONTENT_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const outfitRoutes: MetadataRoute.Sitemap = OUTFIT_GUIDES.map((g) => ({
    url: absoluteUrl(`/outfits/${g.slug}`),
    lastModified: GUIDE_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tutorialRoutes: MetadataRoute.Sitemap = TUTORIAL_PAGES.map((p) => ({
    url: absoluteUrl(`/tutorial/${p.slug}`),
    lastModified: GUIDE_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Produktseiten nur, wenn sie die Qualitätsregel erfüllen (echte
  // Beschreibung, zugeordnete Kategorie, Bild). Alles andere ist noindex.
  const described = await getDescribedProducts(MIN_INDEXABLE_DESCRIPTION_CHARS);
  const seen = new Set<string>();
  const productRoutes: MetadataRoute.Sitemap = [];
  for (const { product, updatedAt } of described) {
    if (!isIndexableProduct(product) || seen.has(product.slug)) continue;
    seen.add(product.slug);
    productRoutes.push({
      url: absoluteUrl(`/litbuy-spreadsheet/${product.slug}`),
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...outfitRoutes,
    ...tutorialRoutes,
    ...productRoutes,
  ];
}
