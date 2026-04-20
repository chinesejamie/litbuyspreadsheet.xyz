import { SITE_URL, SITE_NAME, SITE_CREATOR, absoluteUrl } from "./seo";

// Hardcoded social profiles to avoid circular imports with SITE_CONFIG
const SOCIAL_PROFILES = [
  "https://www.tiktok.com/@timseydiii",
  "https://www.instagram.com/timseydii",
  "https://youtube.com/@timseydi",
  "https://discord.gg/XPH5eMxEP",
];

export function organizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free community-curated database of 10,000+ verified product links for rep fashion finds from Chinese marketplaces, accessible via shopping agents.",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 512,
      height: 512,
    },
    founder: {
      "@type": "Person",
      name: SITE_CREATOR,
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function webSiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/litbuy-spreadsheet?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  dateModified: string;
  breadcrumb?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    dateModified: opts.dateModified,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: SITE_NAME,
    },
    ...(opts.breadcrumb ? { breadcrumb: { "@id": opts.breadcrumb } } : {}),
  };
}

export function breadcrumbListSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// NOTE: HowTo rich results were removed by Google in September 2023.
// This function is kept for reference but MUST NOT be used in page schema.
// Use techArticleSchema for tutorial/guide pages instead.
/** @deprecated HowTo rich results removed by Google Sept 2023. Do not use. */
export function howToSchema(_opts: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string; image?: string }[];
}): null {
  return null;
}

export function techArticleSchema(opts: {
  url: string;
  headline: string;
  description: string;
  authorName: string;
  dateModified: string;
  datePublished?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": opts.url,
    url: opts.url,
    headline: opts.headline,
    description: opts.description,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: opts.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    dateModified: opts.dateModified,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  brand?: string;
  price: number;
  currency?: string;
  images?: string[];
  url: string;
  sku?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    // Ensure all image URLs are absolute — Google requires absolute URLs for rich results
    ...(opts.images?.length
      ? {
          image: opts.images.map((img) =>
            img.startsWith("http") ? img : absoluteUrl(img)
          ),
        }
      : {}),
    ...(opts.brand ? { brand: { "@type": "Brand", name: opts.brand } } : {}),
    ...(opts.sku ? { sku: opts.sku } : {}),
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: opts.currency ?? "USD",
      availability: "https://schema.org/InStock",
      url: opts.url,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnDays: 0,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: opts.currency ?? "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 21,
            unitCode: "DAY",
          },
        },
      },
    },
  };
}

export function itemListSchema(
  products: {
    name: string;
    url: string;
    image?: string;
    price?: number;
    brand?: string;
  }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: p.url,
        ...(p.image ? { image: absoluteUrl(p.image) } : {}),
        ...(p.brand
          ? { brand: { "@type": "Brand", name: p.brand } }
          : {}),
        offers: {
          "@type": "Offer",
          price: p.price ?? 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE_NAME },
        },
      },
    })),
  };
}
