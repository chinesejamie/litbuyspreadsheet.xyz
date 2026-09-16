/**
 * Google Analytics 4 helpers.
 *
 * Measurement IDs are shared with the sister sites (same GA property) so
 * traffic can be compared side by side. Filter by hostname in GA4 to isolate
 * litbuyspreadsheet.xyz. Override via NEXT_PUBLIC_GA_IDS (comma-separated)
 * if this site ever gets its own property.
 */
export const GA_MEASUREMENT_IDS: string[] = (
  process.env.NEXT_PUBLIC_GA_IDS ?? "G-J8NYMZMMEV,G-M30J0GV7SD"
)
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export const GA_PRIMARY_ID = GA_MEASUREMENT_IDS[0] ?? "";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export interface TrackableProduct {
  _id?: string;
  name: string;
  price?: number;
  category?: string;
  store?: string;
}

/**
 * Fired when a visitor clicks a "Buy on LitBuy" link. Mirrors the event
 * shape used on lit-buy-spreadsheet.com so both sites report into the same
 * GA4 event names.
 */
export function trackBuyNowClick(
  product: TrackableProduct,
  location: "card" | "modal" | "product_page" | "category_page" | "unknown" = "unknown"
): void {
  gtag("event", "buy_now_click", {
    event_category: "ecommerce",
    event_label: product.name,
    value: product.price ?? 0,
    currency: "USD",
    product_id: product._id ?? "",
    product_name: product.name,
    product_category: product.category ?? "",
    product_store: product.store ?? "",
    click_location: location,
  });

  if (GA_PRIMARY_ID) {
    gtag("event", "conversion", {
      send_to: GA_PRIMARY_ID,
      event_category: "product_interaction",
      event_label: `${product.name}${product.store ? ` - ${product.store}` : ""}`,
      value: product.price ?? 0,
      currency: "USD",
    });
  }
}

/**
 * Generic outbound click (LitBuy signup, Discord, Telegram, sister sites).
 */
export function trackOutboundClick(label: string, url: string): void {
  gtag("event", "outbound_click", {
    event_category: "outbound",
    event_label: label,
    link_url: url,
  });
}
