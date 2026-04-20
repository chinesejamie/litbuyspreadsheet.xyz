import type { PipelineStage } from "mongoose";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import { buildLitBuyLink } from "@/lib/litbuy";

/**
 * Normalized product shape emitted to the UI layer.
 * Mirrors the OOPBUY backend schema from the `productList` collection,
 * but flattened to strings so React components don't have to guess at
 * polymorphic values.
 */
export interface ProductLite {
  _id: string;
  slug: string; // derived from name — lowercase, hyphenated
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // normalized — always strings, never objects
  mainImage: string; // first image or fallback
  creatorName: string;
  store: string; // 'Taobao' | 'Weidian' | '1688' | ''
  externalId: string; // the original marketplace id
  litbuyLink: string; // built via buildLitBuyLink
}

/**
 * BrandLite — kept as a thin legacy type so `LitBuyBrandsCarousel` still
 * compiles. The OOPBUY schema has no brand concept, so this type is only
 * used for the static fallback list inside that component.
 */
export interface BrandLite {
  _id: string;
  name: string;
  logo: string;
  instagram: string;
}

// ---------- helpers ----------

/**
 * Strip CJK (Chinese, Japanese, Korean) characters and normalize whitespace.
 * OOPBUY's `productList` is full of names like "Owala保温杯大容量 (25)" —
 * we drop the CJK portion and tidy up so English-only names remain.
 * Also strips empty parentheses/brackets left behind after removal.
 */
export function stripCJK(input: string): string {
  return String(input || "")
    // Remove CJK Unified Ideographs + extensions + common symbols
    .replace(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/g, " ")
    // Remove empty brackets left after stripping
    .replace(/\(\s*\)/g, " ")
    .replace(/\[\s*\]/g, " ")
    .replace(/\{\s*\}/g, " ")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Produce a clean, display-ready English name. Falls back to the
 * creatorName + category (or a generic "LitBuy Find" placeholder) when
 * the stripped name is empty — we never want to show a blank title.
 */
export function cleanDisplayName(
  raw: string,
  fallback?: { creatorName?: string; category?: string }
): string {
  const stripped = stripCJK(raw);
  if (stripped.length >= 2) return stripped;
  if (fallback?.creatorName) {
    return `${fallback.creatorName}${fallback.category ? ` — ${fallback.category}` : ""} Find`;
  }
  if (fallback?.category) return `${fallback.category} Find`;
  return "LitBuy Find";
}

/**
 * CNY → target-currency converter ported from OOPBUY's getProduct route.
 * The `price` field in the database is stored in Chinese Yuan; everywhere
 * on the site we display USD, so the default target is USD.
 */
const CONVERSION_RATES: Record<string, number> = {
  USD: 0.14,
  EUR: 0.13,
  GBP: 0.11,
  CNY: 1.0,
  NZD: 0.23,
  AUD: 0.21,
  CAD: 0.19,
};

export function convertPrice(priceCNY: number, target = "USD"): number {
  if (typeof priceCNY !== "number" || !Number.isFinite(priceCNY)) return 0;
  const rate = CONVERSION_RATES[target.toUpperCase()] ?? CONVERSION_RATES.USD;
  return Math.round(priceCNY * rate * 100) / 100;
}

/** lowercase, replace non-alphanumeric with "-", strip leading/trailing "-",
 *  truncate at 75 chars on a word boundary to avoid machine-translated title dumps */
export function slugifyName(name: string): string {
  const raw = String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (raw.length <= 75) return raw;

  // Truncate at last "-" before position 75 to keep whole words
  const truncated = raw.slice(0, 75);
  const lastDash = truncated.lastIndexOf("-");
  return lastDash > 30 ? truncated.slice(0, lastDash) : truncated;
}

/**
 * Normalize an `images` array that may contain either plain string URLs
 * OR `{ url: string }` objects (OOPBUY's original schema allowed both).
 */
function normalizeImages(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item === "string" && item) {
      out.push(item);
    } else if (item && typeof item === "object" && "url" in item) {
      const url = (item as { url?: unknown }).url;
      if (typeof url === "string" && url) out.push(url);
    }
  }
  return out;
}

// Raw shape returned by mongoose .lean() — kept narrow to avoid `any`.
interface RawFindsProduct {
  _id: unknown;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  images?: unknown;
  creatorName?: string;
  store?: string;
  id?: string;
}

/**
 * Convert a mongoose document (or lean object) into the UI-facing ProductLite
 * shape. Handles the dual string/object form of `images`, builds a LitBuy
 * deep-link from `store + id`, and derives a URL-safe slug from the name.
 */
export function serializeProduct(doc: unknown): ProductLite {
  const p = doc as RawFindsProduct;
  const images = normalizeImages(p.images);
  const mainImage = images[0] || "/opengraph-image";

  // Clean name: strip CJK characters and fall back to a safe placeholder
  // when the result is empty (some products are 100% Chinese in the DB).
  const cleanName = cleanDisplayName(p.name ?? "", {
    creatorName: p.creatorName,
    category: p.category,
  });

  // Stored prices are in CNY; display-facing prices are USD.
  const priceCNY = typeof p.price === "number" ? p.price : 0;
  const priceUSD = convertPrice(priceCNY, "USD");

  return {
    _id: String(p._id),
    slug: slugifyName(cleanName),
    name: cleanName,
    description: stripCJK(p.description ?? ""),
    price: priceUSD,
    category: p.category ?? "",
    images,
    mainImage,
    creatorName: p.creatorName ?? "",
    store: p.store ?? "",
    externalId: p.id ?? "",
    litbuyLink: buildLitBuyLink(p.store, p.id),
  };
}

// ---------- public API ----------

/**
 * Ported from OOPBUY's listing route. Boosts are additive values pinned to
 * a specific `boostPage` id and a `validUntil` date; products with an active
 * boost for the homepage page-id float to the top.
 */
const HOMEPAGE_BOOST_PAGE_ID = "696f4c61ea5d31d66e946edb";

/**
 * Fetch the featured product carousel used on the homepage / LitBuy page.
 * Sorts by active boost amount (desc) then `_id` (desc) so new products
 * bubble up without any explicit "featured" flag.
 *
 * Returns an empty array if the MongoDB connection fails — this keeps the
 * build green even if the database is unreachable during SSR.
 */
export async function getFeaturedProducts(limit = 30): Promise<ProductLite[]> {
  try {
    await dbConnect();
    const now = new Date();

    const pipeline: PipelineStage[] = [
      { $match: { hidden: { $ne: true } } },
      {
        $addFields: {
          totalBoostForPage: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: { $ifNull: ["$boosts", []] },
                    as: "b",
                    cond: {
                      $and: [
                        { $eq: ["$$b.boostPage", HOMEPAGE_BOOST_PAGE_ID] },
                        { $gt: ["$$b.validUntil", now] },
                      ],
                    },
                  },
                },
                as: "validBoost",
                in: "$$validBoost.amount",
              },
            },
          },
        },
      },
      { $sort: { totalBoostForPage: -1, _id: -1 } },
      { $limit: limit },
    ];

    const docs = await FindsProduct.aggregate(pipeline);
    return (docs as unknown[]).map(serializeProduct);
  } catch (err) {
    console.error("[productFetcher] getFeaturedProducts failed:", err);
    return [];
  }
}

/**
 * Distinct category values across all non-hidden products.
 * Returns an empty array on database failure.
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    await dbConnect();
    const categories = await FindsProduct.distinct("category", {
      hidden: { $ne: true },
    });
    return (categories as unknown[])
      .filter((c): c is string => typeof c === "string" && c.length > 0)
      .sort();
  } catch (err) {
    console.error("[productFetcher] getAllCategories failed:", err);
    return [];
  }
}

/**
 * Look up a single product by the slug derived from its name.
 *
 * The OOPBUY schema doesn't store a slug field, so we rebuild each
 * product's slug in JS and match against it. To avoid pulling every
 * document we first narrow with a regex against the name (slug → regex
 * approximation: replace "-" with "[^a-z0-9]+").
 */
export async function getProductBySlug(slug: string): Promise<ProductLite | null> {
  try {
    await dbConnect();

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, "");
    const tokens = safeSlug.split("-").filter(Boolean);
    if (tokens.length === 0) return null;

    // Stored names in `productList` often mix CJK characters with English —
    // for example "Owala保温杯大容量 (25)" slugifies to "owala-25". A strict
    // regex over the full name won't match, so we narrow the query to any
    // product containing the first slug token (case-insensitive), then
    // disambiguate on the JS side using the same slugify pipeline the UI
    // uses (which first strips CJK via cleanDisplayName).
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const firstToken = escape(tokens[0]);

    const candidates = await FindsProduct.find({
      hidden: { $ne: true },
      name: new RegExp(firstToken, "i"),
    })
      .limit(200)
      .lean();

    const match = (candidates as unknown[])
      .map(serializeProduct)
      .find((p) => p.slug === slug);

    return match ?? null;
  } catch (err) {
    console.error("[productFetcher] getProductBySlug failed:", err);
    return null;
  }
}
