import { NextResponse } from "next/server";

const LLMS_TXT = `# LitBuy Spreadsheet

> LitBuy Spreadsheet is a free, community-curated database of 10,000+ verified direct product links for rep fashion finds from Chinese marketplaces (Taobao, Weidian, 1688), accessible via shopping agents such as LitBuy.

## What is LitBuy Spreadsheet?

LitBuy Spreadsheet is a free community resource that aggregates verified product links for fashion finds — shoes, hoodies, tracksuits, accessories, and more — from Chinese online marketplaces. Users browse the database, copy product links, and purchase via a shopping agent (like LitBuy) that handles payments, quality control photos, and international shipping.

## Key Pages

- [Homepage & Full Guide](https://litbuyspreadsheet.xyz/): Complete guide to finding, buying, and using the spreadsheet
- [Product Database](https://litbuyspreadsheet.xyz/litbuy-spreadsheet): Browse 10,000+ verified product links by category
- [Step-by-Step Tutorial](https://litbuyspreadsheet.xyz/tutorial): How to place your first order via a shopping agent

## How It Works

1. Browse the product database at /litbuy-spreadsheet
2. Find a product you want (shoes, hoodies, tracksuits, bags, etc.)
3. Copy the product link
4. Sign up on LitBuy (a shopping agent platform)
5. Paste the link into LitBuy and add to your haul
6. Pay, request QC photos, then ship to your address

## Frequently Asked Questions

**What is the LitBuy Spreadsheet?**
A free community database of 10,000+ verified product links for rep fashion finds from Chinese marketplaces, curated and maintained to remove dead links.

**Is the LitBuy Spreadsheet safe?**
The site links to verified marketplace listings via trusted shopping agents. It holds a 4.4/5 Trustpilot rating and a high ScamAdviser trust score.

**Which shopping agents work with the LitBuy Spreadsheet?**
LitBuy is the primary recommended agent. Other compatible agents include Pandabuy, Sugargoo, Kakobuy, and Wegobuy.

**How much do items cost?**
Products range from approximately $5–$150 USD depending on category. Shoes average $20–$50, jackets $30–$80, accessories $5–$30.

**How long does shipping take?**
Standard shipping via DHL, FedEx, or EMS takes 7–21 days depending on destination country and shipping line selected.

**What product categories are available?**
Shoes, T-Shirts, Hoodies, Jackets, Pants, Tracksuits, Accessories, Watches, Bags, Electronics, Sportswear, and more.

## About

- Founded by Miki
- Community-maintained, updated weekly
- Social: TikTok @timseydiii, Instagram @timseydii, YouTube @timseydi, Discord

## Licensing

Content may be indexed for search purposes. Commercial training use is not permitted.
`;

export function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
