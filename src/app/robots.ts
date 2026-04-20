import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Welcome AI search crawlers explicitly
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      // Block training-only crawlers (no search visibility benefit)
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      // Default: allow all, block admin + API
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Host directive is Yandex-only and not part of the robots.txt standard.
    // Removing to avoid malformed directives for other crawlers.
    // host: absoluteUrl("/"),
  };
}
