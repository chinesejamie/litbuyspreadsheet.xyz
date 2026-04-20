/**
 * Canonical category groupings for the LitBuy Spreadsheet.
 *
 * The `productList` MongoDB collection is multi-language and inconsistent —
 * `T-Shirts` / `T` / `camisetas` all refer to the same thing, and casing
 * varies (`Shoes` / `shoes` / `Schuhe` / `Zapatos`). This module defines a
 * single source of truth that groups raw DB values into user-facing tabs.
 *
 * Ordering matches the tab bar display order. `All` is handled separately
 * (no filter applied).
 */
export const CATEGORY_GROUPS: Record<string, string[]> = {
  Shoes: ["Shoes", "shoes", "Schuhe", "Zapatos"],
  "T-Shirts": ["T-Shirts", "T", "camisetas"],
  Hoodies: ["Hoodies", "Hoodie", "Crewneck", "Sweater"],
  Jackets: ["Jackets", "Zipper"],
  Pants: ["Pants", "Pantalones"],
  Shorts: ["Shorts"],
  Tracksuits: ["Tracksuits", "Chándales"],
  Jerseys: ["Jerseys", "Trikots"],
  Accessories: [
    "Accessories",
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
 * group name it belongs to, or the raw value if unclassified.
 */
export function canonicalizeCategory(raw: string): string {
  for (const [canonical, aliases] of Object.entries(CATEGORY_GROUPS)) {
    if (aliases.includes(raw)) return canonical;
  }
  return raw;
}
