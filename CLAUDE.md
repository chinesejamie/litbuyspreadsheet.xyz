# CLAUDE.md - Regeln für Claude in diesem Projekt

## Arbeitsweise

1. **Plan First** - Erst planen, dann coden. Vor jeder nicht-trivialen Aufgabe einen Plan erstellen und mit dem User abstimmen, bevor Code geschrieben wird.
2. **Subagents** - Komplexe Aufgaben an spezialisierte Subagents auslagern. Unabhängige Teilaufgaben parallel bearbeiten lassen.
3. **Verify** - Keine Aufgabe ist fertig ohne Tests. Jede Änderung muss verifiziert werden (Tests ausführen, Build prüfen, Funktionalität bestätigen).
4. **Self-Improvement** - Jeden Fehler notieren, nie wiederholen. Erkenntnisse aus Fehlern als Feedback-Memory speichern.
5. **Auto Bug Fix** - Bugs autonom fixen, kein Händchenhalten. Fehler selbstständig analysieren, Root Cause finden und beheben, ohne unnötige Rückfragen.
6. **SEO First** - Jede Seite, jede Komponente, jedes Feature wird mit SEO-First-Mentalität entwickelt. Keine Seite ohne Metadata, Schema Markup und semantisches HTML.

### Auto-Update Memory (MANDATORY)

**Update memory files AS YOU GO, not at the end.** When you learn something new, update immediately.

| Trigger | Action |
|---------|--------|
| User shares a fact about themselves | → Update `memory-profile.md` |
| User states a preference | → Update `memory-preferences.md` |
| A decision is made | → Update `memory-decisions.md` with date |
| Completing substantive work | → Add to `memory-sessions.md` |
| New keyword/SEO strategy defined | → Update `memory-seo.md` |
| New page/route created | → Update `memory-sitemap.md` |

**Skip:** Quick factual questions, trivial tasks with no new info.

**DO NOT ASK. Just update the files when you learn something.**

---

## Memory Files Struktur

```
.claude/
├── memory-profile.md        # User-Infos, Firma, Kunden
├── memory-preferences.md    # Code-Stil, Design-Vorlieben, Tools
├── memory-decisions.md      # Architektur- & Design-Entscheidungen mit Datum
├── memory-sessions.md       # Log abgeschlossener Arbeit
├── memory-seo.md            # Keywords, Rankings, SEO-Strategie pro Seite
├── memory-sitemap.md        # Alle Routen mit Status (live/draft/planned)
└── memory-feedback.md       # Fehler & Learnings
```

### memory-seo.md Format
```markdown
# SEO Memory

## Globale Strategie
- Primary Domain: ...
- Zielmarkt: ...
- Sprachen: ...

## Seiten-Keywords
| Route | Primary Keyword | Sekundär | Suchintention | Status |
|-------|----------------|----------|---------------|--------|
| / | ... | ... | navigational | live |
| /blog/xxx | ... | ... | informational | draft |

## Tracking
- Letzte Sitemap-Aktualisierung: ...
- Indexierungsprobleme: ...
```

---

## SEO-Workflow (bei JEDER neuen Seite/Feature)

### Schritt 1: Planung
- Ziel-Keyword und Suchintention klären (informational, transactional, navigational)
- Seitenstruktur planen: H1 → H2 → H3 Hierarchie
- Interne Verlinkungsstrategie festlegen
- `memory-seo.md` updaten

### Schritt 2: Technische SEO implementieren
- `generateMetadata()` mit Title (50-60 Zeichen), Description (150-160 Zeichen), Canonical, OG, Twitter
- JSON-LD Structured Data (mindestens `WebPage`, je nach Typ auch `Article`, `Product`, `FAQ`, `HowTo`)
- Breadcrumbs mit `BreadcrumbList` Schema
- `memory-sitemap.md` updaten

### Schritt 3: Content & Semantik
- Nur 1x H1 pro Seite mit Primary Keyword
- Keine Heading-Levels überspringen
- Semantische HTML-Elemente (`section`, `article`, `nav`, `main`, `aside`)
- Bilder mit `next/image`, beschreibende `alt`-Tags, `priority` für LCP
- Mindestens 2-3 kontextuelle interne Links mit beschreibenden Anchors

### Schritt 4: Verify & Deploy
- Lighthouse Score ≥ 90 (Performance, SEO, Accessibility, Best Practices)
- JSON-LD mit schema.org Validator prüfen
- Mobile-Responsiveness testen
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- SEO-Checkliste abarbeiten (siehe unten)

---

## Projekt-Architektur

```
src/
├── app/
│   ├── layout.tsx          # Root Layout mit globaler Metadata + Organization Schema
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamische Sitemap
│   ├── robots.ts           # Robots.txt Config
│   ├── manifest.ts         # PWA Manifest
│   ├── not-found.tsx       # Custom 404 mit Navigation
│   └── [slug]/
│       └── page.tsx        # Dynamische Routen mit generateMetadata + generateStaticParams
├── components/
│   ├── ui/                 # Wiederverwendbare UI-Komponenten
│   ├── layout/             # Header, Footer, Navigation
│   └── seo/                # Breadcrumbs, SchemaScript, MetaImage
├── lib/
│   ├── metadata.ts         # generatePageMetadata() Helper
│   ├── schema.ts           # JSON-LD Schema Generatoren
│   └── seo.ts              # SEO Utilities (slugify, canonical, etc.)
├── content/                # MDX/Content Dateien
└── public/
    ├── images/             # WebP/AVIF Bilder
    └── og/                 # Open Graph Images (1200x630)
```

---

## Metadata Template (Copy-Paste für jede Seite)

```tsx
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Primary Keyword — Brand | Sekundäres Keyword",
    description: "150-160 Zeichen Beschreibung mit CTA und Keyword.",
    alternates: { canonical: "https://domain.com/slug" },
    openGraph: {
      title: "...",
      description: "...",
      images: [{ url: "/og/slug.png", width: 1200, height: 630 }],
      type: "website",
      locale: "de_DE",
    },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}
```

---

## Structured Data Patterns

### Jede Seite bekommt mindestens:
- **Homepage:** `Organization` + `WebSite` (mit `SearchAction`)
- **Unterseiten:** `WebPage` + `BreadcrumbList`
- **Blog:** `Article` mit `author`, `datePublished`, `dateModified`
- **Produkt:** `Product` mit `offers`, `aggregateRating`
- **FAQ Sections:** `FAQPage`
- **Anleitungen:** `HowTo`

### Schema einbinden:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

---

## SEO-Checkliste (vor JEDEM Deploy)

- [ ] `title` 50-60 Zeichen, Primary Keyword vorne
- [ ] `meta description` 150-160 Zeichen mit CTA
- [ ] Canonical URL gesetzt
- [ ] Open Graph vollständig (title, desc, image 1200x630)
- [ ] JSON-LD validiert
- [ ] H1 einmalig mit Primary Keyword
- [ ] Heading-Hierarchie korrekt (H1 → H2 → H3)
- [ ] Alle Bilder: `next/image` + beschreibendes `alt`
- [ ] Interne Links mit beschreibenden Anchors (nie "hier klicken")
- [ ] Breadcrumbs vorhanden + Schema
- [ ] `sitemap.ts` aktualisiert
- [ ] Lighthouse ≥ 90 auf allen Kategorien
- [ ] Mobile responsive
- [ ] Keine Console Errors
- [ ] 404 Page mit Navigation
- [ ] `memory-seo.md` + `memory-sitemap.md` aktualisiert

---

## Code-Stil

- TypeScript strict, keine `any`
- Server Components als Default, `"use client"` nur wenn nötig
- Kein `useEffect` für Daten-Fetching → Server Components / Route Handlers
- Tailwind CSS, keine inline styles
- Semantisches HTML über `div`-Suppe
- Props mit `interface` definieren
- Error Boundaries + Loading States für jede Route
- Deutsche Kommentare für Business-Logik, englische für technische

---

## Verbotene Patterns

- ❌ Client-Side Rendering für SEO-Content
- ❌ JS-abhängige Navigation ohne `<Link>` / `<a>`
- ❌ Bilder ohne `alt`
- ❌ Duplicate Content ohne Canonical
- ❌ `div` statt semantischer Elemente
- ❌ Heading-Levels überspringen
- ❌ Keyword Stuffing / Hidden Text
- ❌ `index: false` ohne Grund
- ❌ Inline styles statt Tailwind
- ❌ Seite deployen ohne SEO-Checkliste