import type { ProductLite } from "./productFetcher";
import { canonicalizeCategory } from "./categoryGroups";

/**
 * Indexierbarkeits-Regel für Produktseiten.
 *
 * Hintergrund: Die Datenbank enthält ~8.600 Produkte, fast alle ohne
 * Beschreibung. Eine Produktseite, die nur Name + Preis + Kauf-Link zeigt,
 * ist aus Google-Sicht "scaled content" und gefährdet die gesamte Domain
 * (August 2026 Spam Update). Deshalb bekommen nur Produkte mit echtem
 * Inhalt einen Index-Eintrag und einen Sitemap-Platz. Alle anderen Seiten
 * bleiben für Nutzer erreichbar, tragen aber `noindex, follow`.
 *
 * Wenn Beschreibungen nachgepflegt werden (Admin-UI oder Backfill-Script),
 * werden die betroffenen Seiten beim nächsten Revalidate automatisch
 * indexierbar — ohne Codeänderung.
 */
export const MIN_INDEXABLE_DESCRIPTION_CHARS = 120;

/**
 * Seit 10/2026 aus: Die Beschreibungen in der geteilten DB wurden mit
 * generiertem Fülltext aufgefüllt, dadurch erfüllten 4.327 Produkte (viele
 * mit Markennamen im Title) die Längenregel und standen in der Sitemap.
 * Die Zeichenzahl trennt echten Inhalt nicht mehr von Fülltext, deshalb
 * sind alle Produktseiten wieder `noindex, follow`. Erst wieder einschalten,
 * wenn die Regel Fülltext und Markenartikel ausschließt.
 */
export const PRODUCT_PAGES_INDEXABLE = false;

export function isIndexableProduct(p: ProductLite): boolean {
  if (!PRODUCT_PAGES_INDEXABLE) return false;
  if (!p.name || p.name.length < 4) return false;
  if (/^\d+$/.test(p.slug)) return false;
  if (p.images.length === 0) return false;
  if ((p.description ?? "").trim().length < MIN_INDEXABLE_DESCRIPTION_CHARS)
    return false;
  if (canonicalizeCategory(p.category) === "Other") return false;
  return true;
}
