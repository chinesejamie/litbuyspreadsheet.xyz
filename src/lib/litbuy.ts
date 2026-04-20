const INVITE_CODE = "0X0WQA4NL";
const LITBUY_BASE_URL = "https://litbuy.com";

export function detectPlatform(url: string): { platform: string; productId: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();

    // 1688
    if (host.includes("1688.com")) {
      // e.g. https://detail.1688.com/offer/123456789.html
      const match = u.pathname.match(/\/offer\/(\d+)\.html/);
      if (match) return { platform: "0", productId: match[1] };
    }

    // Taobao
    if (host.includes("taobao.com") || host.includes("tmall.com")) {
      // e.g. https://item.taobao.com/item.htm?id=123456789
      const id = u.searchParams.get("id");
      if (id) return { platform: "1", productId: id };
    }

    // Weidian
    if (host.includes("weidian.com")) {
      // e.g. https://weidian.com/item.html?itemID=123456789
      const id = u.searchParams.get("itemID") || u.searchParams.get("itemId");
      if (id) return { platform: "weidian", productId: id };
    }

    return null;
  } catch {
    return null;
  }
}

export function convertToLitBuy(link: string): string {
  if (!link || link === "#") return `${LITBUY_BASE_URL}/register?inviteCode=${INVITE_CODE}`;

  const detected = detectPlatform(link);
  if (!detected) return `${LITBUY_BASE_URL}/register?inviteCode=${INVITE_CODE}`; // unknown format → LitBuy invite

  return `${LITBUY_BASE_URL}/product/${detected.platform}/${detected.productId}?inviteCode=${INVITE_CODE}`;
}

/**
 * Build a LitBuy deep-link directly from the marketplace identifier pair
 * (store + id) that OOPBUY stores as separate fields on the Product document.
 *
 * Store → platform code mapping:
 *   "1688"    → "0"
 *   "Taobao"  → "1"
 *   "Weidian" → "weidian"
 *
 * Falls back to the generic LitBuy invite URL if either field is missing
 * or the store name is unrecognised.
 */
export function buildLitBuyLink(
  store: string | undefined | null,
  id: string | undefined | null
): string {
  if (!store || !id) return `${LITBUY_BASE_URL}/register?inviteCode=${INVITE_CODE}`;

  const normalized = String(store).toLowerCase();
  let platform: string | null = null;
  if (normalized === "taobao") platform = "1";
  else if (normalized === "1688") platform = "0";
  else if (normalized === "weidian") platform = "weidian";

  if (!platform) return `${LITBUY_BASE_URL}/register?inviteCode=${INVITE_CODE}`;

  return `${LITBUY_BASE_URL}/product/${platform}/${id}?inviteCode=${INVITE_CODE}`;
}

export const LITBUY_INVITE = `${LITBUY_BASE_URL}/register?inviteCode=${INVITE_CODE}`;
