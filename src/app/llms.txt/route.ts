import { NextResponse } from "next/server";
import { CATEGORY_GUIDES } from "@/content/categories";
import { OUTFIT_GUIDES } from "@/content/outfits";
import { TUTORIAL_PAGES } from "@/content/tutorials";

const BASE = "https://litbuyspreadsheet.xyz";

function buildLlmsTxt(): string {
  const categoryLines = CATEGORY_GUIDES.map(
    (g) => `- [${g.canonical}](${BASE}/categories/${g.slug}): ${g.tagline}`
  ).join("\n");
  const outfitLines = OUTFIT_GUIDES.map(
    (g) => `- [${g.h1}](${BASE}/outfits/${g.slug}): ${g.tagline}`
  ).join("\n");
  const tutorialLines = TUTORIAL_PAGES.map(
    (p) => `- [${p.h1}](${BASE}/tutorial/${p.slug}): ${p.tagline}`
  ).join("\n");

  return `# LitBuy Reps Guide

> The editorial companion to the LitBuy Spreadsheet: category buying guides, outfit blueprints and step-by-step tutorials for ordering rep fashion from Taobao, Weidian and 1688 through the LitBuy shopping agent.

## What this site is

litbuyspreadsheet.xyz is a guide site. It explains how to size, QC and budget each product category, shows complete outfit builds, and walks first-time buyers through a LitBuy order. Product listings are pulled live from the community spreadsheet database and link out to LitBuy.

## Category guides

${categoryLines}

## Outfit guides

${outfitLines}

## Tutorials

- [How to Order from LitBuy](${BASE}/tutorial): Four-step overview for a first order
${tutorialLines}

## Other pages

- [Homepage](${BASE}/): Overview, FAQ and comparison of shopping agents
- [Category hub](${BASE}/categories): All ten category guides
- [Browse the spreadsheet](${BASE}/litbuy-spreadsheet): Searchable product grid

## Frequently asked questions

**What is the LitBuy Spreadsheet?**
A community-maintained database of verified product links for rep fashion from Chinese marketplaces, curated to remove dead links. This site is its guide companion.

**How do I buy something?**
Open a listing, click "Buy on LitBuy", add the item to your LitBuy cart, pay, wait for QC photos at the warehouse, then choose a shipping line. The tutorial covers each step.

**How long does shipping take?**
Typically 7–21 days depending on the shipping line and destination country.

**Which categories are covered?**
Shoes, T-Shirts, Hoodies, Jackets, Pants, Shorts, Tracksuits, Jerseys, Accessories and Electronics.

## About

- Written and maintained by Miki
- Social: TikTok @timseydiii, Instagram @timseydii, YouTube @timseydi, Discord

## Licensing

Content may be indexed and cited for search and answer purposes with attribution. Commercial training use is not permitted.
`;
}

export function GET() {
  return new NextResponse(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
