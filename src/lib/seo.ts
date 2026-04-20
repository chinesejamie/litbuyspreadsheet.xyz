// Core SEO constants and URL helpers used across the app
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || "https://litbuyspreadsheet.xyz";

export const SITE_NAME = "LitBuy Spreadsheet";
export const SITE_CREATOR = "Miki";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

/**
 * Build an absolute URL from a path against SITE_URL.
 * Trailing slashes are stripped from the result, except when the
 * resolved path is the bare root "/".
 */
export function absoluteUrl(path: string): string {
  const resolved = new URL(path, SITE_URL).toString();
  if (resolved.endsWith("/")) {
    // Preserve root "/" e.g. https://litbuyspreadsheet.xyz/
    const url = new URL(resolved);
    if (url.pathname === "/") return resolved;
    return resolved.replace(/\/+$/, "");
  }
  return resolved;
}

/**
 * Canonical URL helper. Ensures the path has a leading slash before
 * delegating to absoluteUrl.
 */
export function canonicalFor(path: string): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(withSlash);
}
