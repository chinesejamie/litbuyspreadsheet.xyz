/**
 * Canonical category groupings for the LitBuy Spreadsheet.
 *
 * The `productList` MongoDB collection is multi-language and inconsistent —
 * `T-Shirts` / `T` / `tShirts` / `camisetas` all refer to the same thing, and
 * casing varies (`Shoes` / `shoes` / `Schuhe` / `Zapatos`). MongoDB `$in`
 * matching is case-sensitive, so every spelling that exists in the DB has to
 * be listed here explicitly. This module is the single source of truth that
 * groups raw DB values into user-facing categories.
 *
 * Ordering matches the tab bar display order. `All` is handled separately
 * (no filter applied).
 */
export const CATEGORY_GROUPS: Record<string, string[]> = {
  Shoes: ["Shoes", "shoes", "Schuhe", "Zapatos"],
  "T-Shirts": ["T-Shirts", "T", "tShirts", "tshirts", "camisetas"],
  Hoodies: ["Hoodies", "hoodies", "Hoodie", "Crewneck", "Sweater"],
  Jackets: ["Jackets", "jackets", "Zipper"],
  Pants: ["Pants", "pants", "Pantalones"],
  Shorts: ["Shorts", "shorts"],
  Tracksuits: ["Tracksuits", "tracksuits", "Chándales"],
  Jerseys: ["Jerseys", "jerseys", "Trikots"],
  Accessories: [
    "Accessories",
    "accessories",
    "Accesorios",
    "Bags",
    "Belts",
    "Wallets",
    "Hats",
    "Sombreros",
    "Watches",
    "Watch",
    "Socks",
  ],
  Electronics: [
    "Electronics",
    "electronics",
    "Consumer Electronics",
    "Consumer electronics products",
    "Tech",
    "apple",
  ],
  Other: [
    "clothing",
    "Polos",
    "Decoration",
    "Zubehör",
    "Full set!",
    "Verified Finds",
    "Not Assigned",
    "Unknown",
    "1:1 original with logo, top quality",
  ],
};

/**
 * Canonical category names in display order.
 */
export const CANONICAL_CATEGORIES = Object.keys(CATEGORY_GROUPS);

/**
 * Categories that get their own indexable landing page under /categories/.
 * "Other" is deliberately excluded — it is a catch-all bucket (mostly
 * "Not Assigned" records) with no coherent search intent behind it.
 */
export const LANDING_CATEGORIES = CANONICAL_CATEGORIES.filter(
  (c) => c !== "Other"
);

/**
 * URL slug for a canonical category ("T-Shirts" → "t-shirts").
 */
export function categorySlug(canonical: string): string {
  return canonical
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Reverse of categorySlug — returns the canonical name for a URL slug or
 * null when the slug does not map to a landing category.
 */
export function categoryFromSlug(slug: string): string | null {
  const normalized = String(slug || "").toLowerCase();
  return (
    LANDING_CATEGORIES.find((c) => categorySlug(c) === normalized) ?? null
  );
}

/**
 * Resolve a user-facing category name (or raw DB value) into the full list
 * of DB values to query against. Falls back to `[name]` for unknown groups
 * so the API stays permissive.
 */
export function expandCategory(name: string): string[] {
  if (!name) return [];
  const group = CATEGORY_GROUPS[name];
  if (group && group.length) return group;
  return [name];
}

/**
 * Reverse lookup: given a raw DB category value, return the canonical
 * group name it belongs to. Unknown / empty values resolve to "Other" so
 * the UI never shows raw DB noise such as "Not Assigned".
 */
export function canonicalizeCategory(raw: string | undefined | null): string {
  if (!raw) return "Other";
  for (const [canonical, aliases] of Object.entries(CATEGORY_GROUPS)) {
    if (aliases.includes(raw)) return canonical;
  }
  // Case-insensitive second pass for values we have not catalogued yet.
  const lower = raw.toLowerCase();
  for (const [canonical, aliases] of Object.entries(CATEGORY_GROUPS)) {
    if (aliases.some((a) => a.toLowerCase() === lower)) return canonical;
  }
  return "Other";
}
