import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import { serializeProduct } from "@/lib/productFetcher";
import { OUTFIT_GUIDES } from "@/content/outfits";
import { TUTORIAL_PAGES } from "@/content/tutorials";

// Revalidate sitemap every 24h so new products get picked up without a full rebuild
export const revalidate = 86400;

// Placeholder slug produced when a product name is empty/CJK-only after stripping.
// These add zero keyword value and should not be submitted to Google.
const SLUG_BLOCKLIST = new Set([
  "fashionhunter-not-assigned-find",
  "not-assigned-find",
]);

/** Returns false for slugs that are pure noise:
 *  - too short (< 4 chars)
 *  - pure numbers
 *  - in the explicit block list
 */
function isQualitySlug(slug: string): boolean {
  if (slug.length < 4) return false;
  if (/^\d+$/.test(slug)) return false;
  if (SLUG_BLOCKLIST.has(slug)) return false;
  return true;
}

interface RawProduct {
  _id: unknown;
  name?: string;
  updatedAt?: Date;
  createdAt?: Date;
  [key: string]: unknown;
}

async function getProductSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    await dbConnect();
    const docs = await FindsProduct.find({ hidden: { $ne: true } })
      .select(
        "_id name description price category images creatorName store id updatedAt createdAt"
      )
      .lean();

    const seen = new Set<string>();
    const results: { slug: string; updatedAt: Date }[] = [];

    for (const doc of docs as unknown as RawProduct[]) {
      const product = serializeProduct(doc);
      const slug = product.slug;

      // Skip empty, low-quality, or duplicate slugs
      if (!slug || !isQualitySlug(slug) || seen.has(slug)) continue;

      seen.add(slug);
      results.push({
        slug,
        updatedAt:
          (doc.updatedAt as Date) ?? (doc.createdAt as Date) ?? new Date(),
      });
    }

    return results;
  } catch (err) {
    console.error("[sitemap] getProductSlugs failed:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use hardcoded dates for static pages — dynamic `new Date()` tricks Google
  // into thinking the page changed on every revalidation cycle.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-04-13"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/litbuy-spreadsheet"),
      lastModified: new Date("2026-04-13"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/tutorial"),
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/outfits"),
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const outfitRoutes: MetadataRoute.Sitemap = OUTFIT_GUIDES.map((g) => ({
    url: absoluteUrl(`/outfits/${g.slug}`),
    lastModified: new Date("2026-04-28"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tutorialRoutes: MetadataRoute.Sitemap = TUTORIAL_PAGES.map((p) => ({
    url: absoluteUrl(`/tutorial/${p.slug}`),
    lastModified: new Date("2026-04-28"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const products = await getProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = products.map(
    ({ slug, updatedAt }) => ({
      url: absoluteUrl(`/litbuy-spreadsheet/${slug}`),
      lastModified: updatedAt,
    })
  );

  return [...staticRoutes, ...outfitRoutes, ...tutorialRoutes, ...productRoutes];
}
