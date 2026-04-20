# Architektur- & Design-Entscheidungen

## 2026-04-08 — LitBuy Rebrand (Round 2)

### Kontext
Follow-up to the LitBuy Spreadsheet SEO rebuild: user wanted full visual rebrand to match the real LitBuy brand identity.

### Entscheidung
1. **Color palette** — swapped blue (#2563eb) for LitBuy gold/yellow (#ffe34d primary, #fff175 hover, #e6c939 dim). Background deepened to #0a0a0f (near-black with slight blue undertone). Text-secondary warmed to #a5a5bc. Source: LitBuy iOS App Store icon color metadata.
2. **Fonts** — dropped Sora, Space Mono, Extenda, Archivo Black. New stack: **Space Grotesk** (body/display) + **JetBrains Mono** (monospace). Self-hosted via Google Fonts woff2 @font-face.
3. **Brand rename** — `FINDZ` → `LitBuy Spreadsheet` across: SITE_CONFIG.name, SITE_CONFIG.brandName, Logo component ("litbuy" with yellow "lit"), Footer tagline.
4. **Section removal** — deleted the brands carousel (`LitBuyBrandsCarousel`) and the NeedHelp/community section from the LitBuy page composition. `/socials` removed from Header nav, Footer, and sitemap. `/brands` kept in nav (real catalog route).
5. **Button contrast** — every `bg-accent text-white` swapped to `bg-accent text-bg-primary` since yellow requires dark text for WCAG contrast. Also updated Hero/CTA hover outline button to `hover:text-bg-primary`.
6. **Orphan cleanup** — removed lingering `rgba(37,99,235,0.1)` blue shadows from `/outfits`, `/brands`, `/products` search inputs. Old hero glow rgba updated to yellow.
7. **Props shrink** — since brands carousel was removed, `LitBuySpreadsheetPage` no longer accepts a `brands` prop. Route pages (`/` and `/litbuy-spreadsheet`) dropped `getBrands()` from their Promise.all.

### Begründung
- The yellow-on-dark palette matches the actual LitBuy brand much more distinctively than the previous blue accent.
- Space Grotesk has more personality than Sora and reads distinctly — better for brand recall.
- Removing brands/socials sections focuses the landing page on its core SEO intent (the keyword "litbuy spreadsheet") without noise.

### Trade-offs
- Visible word count dropped from 3,985 → 3,926 (negligible, still 3x the SERP competition).
- Yellow is louder than blue. Lighthouse contrast check still passes (bg-primary on accent = AAA).
- Space Grotesk and JetBrains Mono each load a single woff2 — total font weight ~60KB, similar to previous stack.

---

## 2026-04-08 — Rebuild Homepage as "LitBuy Spreadsheet" SEO Landing Page

### Kontext
Homepage was a client-component FINDZ hero with no keyword targeting. Research showed `litbuy spreadsheet` is a LOW-MODERATE competition keyword with no long-form authoritative content in the SERP.

### Entscheidung
1. **Route strategy:** Render the same component at both `/` (canonical) and `/litbuy-spreadsheet` (keyword-rich alias). Both emit `<link rel="canonical">` pointing to `/`. This captures the keyword URL for organic click-through without splitting authority.
2. **Branding:** Dropped FINDZ from H1 / hero / metadata. Page is now branded `LitBuy Spreadsheet` for maximum keyword match. FINDZ brand still lives in Header/Footer.
3. **Server-first architecture:** Converted the homepage from a 100% client component with `useEffect` fetches to a server component that pre-fetches products and brands via `src/lib/productFetcher.ts` (direct mongoose, no HTTP round-trip). Only 3 carousel islands remain `"use client"` (`LitBuyTopProductsCarousel`, `LitBuyBrandsCarousel`, `LitBuyCategoriesGrid`).
4. **ISR:** `export const revalidate = 3600` on both route pages. Balances freshness (hourly) with build stability.
5. **Content mix:** Hybrid — long-form SEO content (What is, How to Use, Comparison, QC, Agents, FAQ, HowTo, Trust) + ecommerce carousels (Top Products, Brands, Categories). Target ~6,000 visible words.
6. **Schema stack:** Organization + WebSite at layout level; WebPage + BreadcrumbList + FAQPage + HowTo + ItemList per LitBuy page.
7. **Single source of truth:** All copy lives in `src/content/litbuy.ts` so visible DOM and JSON-LD schema can never drift.

### Begründung
- Beats current SERP (max ~1,400 words) with 6,000-word depth + schema richness + E-E-A-T.
- Canonical-to-root strategy consolidates authority.
- ISR avoids both the build-time mongoose problem and the SEO cost of `useEffect` fetches.

### Trade-offs
- `/litbuy-spreadsheet` duplicates the homepage — mitigated by canonical tag.
- First-load bundle slightly larger because of three carousel client islands (framer-motion scoped to them only).
- If MongoDB is unreachable at build, `productFetcher` catches and returns `[]` — page still renders gracefully.

## 2026-04-08 — Created missing SEO infrastructure

### Entscheidung
Created the SEO plumbing that was completely absent from the project:
- `src/lib/seo.ts` — SITE_URL, absoluteUrl, canonicalFor helpers
- `src/lib/metadata.ts` — `generatePageMetadata()` helper
- `src/lib/schema.ts` — JSON-LD builders (Organization, WebSite, WebPage, Breadcrumb, FAQPage, HowTo, ItemList)
- `src/lib/productFetcher.ts` — server-side mongoose fetchers with graceful fallback
- `src/app/sitemap.ts` + `src/app/robots.ts`
- `src/components/seo/SchemaScript.tsx` + `Breadcrumbs.tsx`
- `src/hooks/useAutoScroll.ts` (extracted from old page.tsx)
- `src/lib/categoryImages.ts` (extracted from old page.tsx)

### Begründung
Every future page in this project can now use `generatePageMetadata()` and the schema builders. One-time investment, perpetual reuse.
