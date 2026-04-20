import type { Metadata } from "next";
import { absoluteUrl, canonicalFor, DEFAULT_OG_IMAGE, SITE_NAME } from "./seo";

export interface PageMetaOpts {
  title: string;
  description: string;
  path: string;
  canonicalPath?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Generate a fully populated Next.js Metadata object for a page.
 * Centralizes Open Graph, Twitter, canonical and robots configuration.
 */
export function generatePageMetadata(opts: PageMetaOpts): Metadata {
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  const ogType = opts.type ?? "website";

  const robots: Metadata["robots"] = opts.noindex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    // Use absolute to bypass the layout-level title.template suffix — these
    // landing-page titles are already fully keyword-optimized.
    title: { absolute: opts.title },
    description: opts.description,
    keywords: opts.keywords,
    alternates: {
      canonical: canonicalFor(opts.canonicalPath ?? opts.path),
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: absoluteUrl(opts.path),
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
      type: ogType,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
    robots,
  };
}
