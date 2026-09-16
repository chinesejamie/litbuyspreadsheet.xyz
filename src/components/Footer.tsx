import Link from "next/link";
import Logo from "./Logo";
import { CATEGORY_GUIDES } from "@/content/categories";
import { OUTFIT_GUIDES } from "@/content/outfits";
import { TUTORIAL_PAGES } from "@/content/tutorials";
import { LITBUY_LAST_UPDATED } from "@/content/litbuy";

const PRIMARY_LINKS = [
  { href: "/litbuy-spreadsheet", label: "Spreadsheet" },
  { href: "/categories", label: "Categories" },
  { href: "/outfits", label: "Outfits" },
  { href: "/tutorial", label: "Tutorial" },
];

/**
 * Site-wide footer. Server component — no motion, so the links are in the
 * initial HTML for every page. Deliberately contains no cross-site link
 * network: the only external link is the primary spreadsheet, marked
 * nofollow so the two domains are not read as a link scheme.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Logo size={36} />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-text-muted mb-4">
              LitBuy Reps Guide &mdash; Outfits, Tutorials &amp; Curated Finds
            </p>
            <nav aria-label="Primary" className="flex flex-col gap-2">
              {PRIMARY_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono text-xs font-bold uppercase text-text-secondary hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <nav aria-label="Categories">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
              Categories
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {CATEGORY_GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/categories/${g.slug}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {g.canonical}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Outfit guides">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
              Outfit Guides
            </h2>
            <ul className="flex flex-col gap-2">
              {OUTFIT_GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/outfits/${g.slug}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {g.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tutorials">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
              Tutorials
            </h2>
            <ul className="flex flex-col gap-2">
              {TUTORIAL_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/tutorial/${p.slug}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {p.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] font-mono uppercase tracking-wide text-text-muted">
          <span>Guides last reviewed {LITBUY_LAST_UPDATED}</span>
          <span>
            Full product database:{" "}
            <a
              href="https://lit-buy-spreadsheet.com"
              rel="nofollow noopener"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              lit-buy-spreadsheet.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
