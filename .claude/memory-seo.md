# SEO Memory

## Globale Strategie
- Primary Domain: https://findz.st (SITE_URL env: `NEXT_PUBLIC_SITE_URL`)
- Zielmarkt: DE/EU/US rep-buying community
- Sprachen: English (en_US, `<html lang="en">`)
- Brand name in metadata: `LitBuy Spreadsheet` (rebranded from FINDZ per 2026-04-08 decision)
- Author / E-E-A-T: Miki
- Last global content refresh: 2026-04-08

## Seiten-Keywords

| Route | Primary Keyword | Sekundär | Suchintention | Status |
|-------|----------------|----------|---------------|--------|
| / | litbuy spreadsheet | litbuy spreadsheet 2026, litbuy sheet, litbuy finds | navigational + informational | live |
| /litbuy-spreadsheet | litbuy spreadsheet | litbuy links, litbuy guide, litbuy litbuy | navigational + informational | live (canonical → /) |
| /products | litbuy products, rep finds, taobao finds | brand-specific | transactional | live |
| /brands | litbuy brands, rep brands | brand directory | informational | live |
| /categories | litbuy categories | shoes/hoodies/jackets | informational | live |
| /tutorial | how to use litbuy, rep buying tutorial | how-to | informational | live |
| /outfits | litbuy outfit inspiration | navigational | informational | live |
| /socials | — | brand discovery | navigational | live |

## Canonical Strategy

- Homepage `/` is the single canonical target for the "litbuy spreadsheet" keyword cluster.
- `/litbuy-spreadsheet` renders the same component and emits `<link rel="canonical" href="https://findz.st/">` — do NOT self-canonical this route.
- Both routes are in sitemap.xml with `index, follow`. Google consolidates signals on `/` via canonical.

## Schema Markup (per page)

- **Layout-level (every page):** Organization, WebSite (with SearchAction)
- **Homepage + /litbuy-spreadsheet:** + WebPage + BreadcrumbList + FAQPage (15 Q/A) + HowTo (6 steps) + ItemList (top 20 products)
- Single source of truth: `src/content/litbuy.ts`

## Target Content Benchmarks

- Visible word count on `/`: ~6,000 words (target, to beat current SERP which tops out at ~1,400)
- H1 count: exactly 1 per page
- H2 hierarchy: 12 H2 sections on the LitBuy page
- Internal links: FAQ section links to /products, /brands, /categories, /tutorial
- Images: descriptive `alt` with "LitBuy Spreadsheet" phrase where natural
- Freshness: "2026" in H1 + meta title; `LITBUY_LAST_UPDATED` constant in `src/content/litbuy.ts`

## Tracking

- Letzte Sitemap-Aktualisierung: 2026-04-08 (sitemap.ts created)
- Robots.txt: created 2026-04-08 — allow all except /admin, /api
- Indexierungsprobleme: none yet (freshly launched page)
- Rich Results pending validation at https://search.google.com/test/rich-results
- Lighthouse targets: SEO ≥ 98, Performance ≥ 90, LCP < 2.5s, CLS < 0.1

## Keyword Research Notes (SERP snapshot 2026-04-08)

- "litbuy spreadsheet" = LOW-MODERATE competition, ~500-2,000 monthly searches.
- Current SERP top-5: litbuy.net, litbuyspreadsheet.gg, litbuy.com, litbuysheets.net (2-month-old, ~1,300 words), Instagram/TikTok.
- No long-form authoritative guide exists — blue ocean opportunity.
- Winning recipe: 5,500+ words, H1/H2/H3 hierarchy, FAQPage + HowTo schema, E-E-A-T signals, 2026 freshness marker.
