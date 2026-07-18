# Session Log

## 2026-04-08 — LitBuy Spreadsheet SEO Landing Page Rebuild

**Duration:** One session
**Goal:** Rebuild homepage as an SEO-optimized "LitBuy Spreadsheet" landing page targeting the keyword to rank #1.

### Research Phase
- Launched 3 parallel Explore agents: codebase SEO infrastructure audit, SERP/keyword analysis for "litbuy spreadsheet", LitBuy content deep-dive.
- Confirmed keyword is LOW-MODERATE competition with no long-form authoritative content in SERP.
- Drafted 15 FAQ Q/A, 6-step HowTo, comparison table, quality control tips, 6 shipping agents with descriptions.

### Design Phase
- Launched Plan agent for file-level implementation blueprint.
- User confirmed scope: same component at `/` + `/litbuy-spreadsheet`, canonical → `/`, rebrand to LitBuy Spreadsheet, hybrid content mix (ecommerce + long-form SEO).
- Wrote final plan to `/Users/asiger/.claude/plans/abstract-hatching-rabbit.md`.
- Plan approved.

### Implementation Phase

**SEO infrastructure (delegated to agent):**
- `src/lib/seo.ts`, `metadata.ts`, `schema.ts`, `categoryImages.ts`, `productFetcher.ts`
- `src/hooks/useAutoScroll.ts` (extracted from old page.tsx)
- `src/app/sitemap.ts`, `robots.ts`
- `src/components/seo/SchemaScript.tsx`, `Breadcrumbs.tsx`

**Content module (written directly):**
- `src/content/litbuy.ts` — 15 FAQ, 6 HowTo steps, 9 comparison rows, 10 category descriptions, 6 shipping agents, 3 testimonials, trust stats, hero copy, CTA banner copy, keyword list. Single source of truth for visible DOM + JSON-LD.

**Section components (10 server, delegated to agent):**
- `LitBuyHero`, `LitBuyWhatIs`, `LitBuyHowToUse`, `LitBuyComparisonTable`, `LitBuyQualityControl`, `LitBuyShippingAgents`, `LitBuyHowToOrder`, `LitBuyTrustSignals`, `LitBuyFAQ` (JS-free `<details>` accordions), `LitBuyCTABanner`.

**Carousel components (3 client, written directly):**
- `LitBuyTopProductsCarousel` (receives server-fetched products prop)
- `LitBuyBrandsCarousel` (receives server-fetched brands prop, fallback to static list)
- `LitBuyCategoriesGrid` (auto-scroll carousel + descriptive grid below)

**Composition (written directly):**
- `LitBuySpreadsheetPage` — server component tying all sections together, injects JSON-LD schema graph (Organization, WebSite, WebPage, Breadcrumb, FAQPage, HowTo, ItemList).

**Routes:**
- `src/app/page.tsx` — replaced with server component using `generateMetadata`, `getFeaturedProducts`, `getBrands`, `revalidate = 3600`.
- `src/app/litbuy-spreadsheet/page.tsx` — created, identical composition, own metadata, canonical → `/`.
- `src/app/layout.tsx` — stripped hard-coded FINDZ title/og, added `metadataBase`, `title.template`, and global Organization + WebSite schema via SchemaScript.

**Memory updates:**
- `.claude/memory-seo.md`, `memory-sitemap.md`, `memory-decisions.md`, `memory-sessions.md`

### Deliverables
- 21 new files created
- 2 existing files modified (`src/app/page.tsx`, `src/app/layout.tsx`)
- 1 plan file written
- 4 memory files created
- Target ~6,000 visible words on the rendered LitBuy page

---

## 2026-04-28 — Strategy Pivot: Long-Tail Brand-Reps Cluster

**Trigger:** User fragte warum Ahrefs 0 Traffic zeigt trotz DR 49 (gekauft via Fiverr).

**Diagnose (aus GSC + SERP-Analyse):**
- Ahrefs DB hat kein Volumen für die Brand-Queries der Site → zeigt 0
- GSC zeigt: 412 Impressionen, 5 Klicks in 3 Wochen (Site ist 2026-04-09 indexiert)
- Position 1.55 für "how to order from litbuy" mit 0 Klicks → User suchen den echten LitBuy-Agent, nicht uns
- Fiverr-Links pushen DR aber kein Ranking-Impact (devaluiert von Google)
- Hauptproblem: Keyword-Pool zu klein (~40 Imps/Tag), fast nur Brand-Queries

**Strategiewechsel:**
Ziel ist Neukunden, die LitBuy NICHT kennen. Die suchen "[brand] reps", "best chinese shopping
agent", "litbuy vs X" etc. — nicht "litbuy spreadsheet". Neue Strategie:
1. Brand-Reps-Cluster `/brands/[slug]` (wide-open SERP, kein Sister-Site hat dedizierte Brand-Pages)
2. 5-Article-Core + Comparison-Pages
3. Internal Linking concentriert "litbuy spreadsheet" Anchors auf `/` für #1-Push

**Recherche durchgeführt** (alle Outputs in `.claude/history/`):
- `research-keywords.md` — Top 50 Keywords gerankt P0/P1/P2 (Volume-Tiers geschätzt, DataForSEO nicht konfiguriert)
- `research-competitors.md` — Sister-Site-Audit: KakoBuy, JoyaGoo, HippooBuy (parked!), litbuyspreadsheet.gg, OopBuy, OrientDig, LitBuySheets, CNFansPortal
- `architecture.md` — 4 Templates (Brand, Article, Feature, Hub), URL-Tree, Schema-Strategie, Sprint P0/P1 Plan, Internal-Link-Backbone

**History-System aufgesetzt** (`.claude/history/`):
- `baseline.md` — immutable Snapshot 2026-04-28 (GSC + Ahrefs + bekannte Probleme)
- `changelog.md` — was wann gemacht wurde (mit Hypothesen + erwarteter Impact)
- `experiments.md` — EXP-01 bis EXP-04 mit Erfolgsmetriken + Messzeitpunkten
- `reviews.md` — täglicher Review-Verlauf
- `daily-review.md` — Workflow-Doku wie tägliche Auswertung läuft

**Sprint P0 geplant** (2026-04-28 → 2026-05-12): 38 neue Pages
**Sprint P1 geplant** (2026-05-13 → 2026-05-26): +24 Pages + DE-Lokalisierung

**Open Decisions vor Build:**
- Brand product source: brand-tagged in MongoDB oder Backfill nötig?
- Slug-Konvention: `/brands/[slug]` bestätigt (existing route)
- DataForSEO Credentials: empfohlen vor Sprint P1
- Content-Review: Miki-Approval pro Article oder Spot-Check?
