import Link from "next/link";
import type { CategoryGuide } from "@/content/categories";

interface RelatedCategoriesProps {
  guides: CategoryGuide[];
  heading?: string;
}

/**
 * Chip-Leiste mit Links auf Kategorie-Guides. Wird auf Outfit- und
 * Tutorial-Seiten eingesetzt, damit die kommerziellen Seiten interne Links
 * aus dem redaktionellen Teil bekommen.
 */
export default function RelatedCategories({
  guides,
  heading = "Shop by category",
}: RelatedCategoriesProps) {
  if (guides.length === 0) return null;
  return (
    <nav aria-label={heading} className="mb-12">
      <h2 className="text-xl font-bold uppercase tracking-tight mb-4">{heading}</h2>
      <ul className="flex flex-wrap gap-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/categories/${g.slug}`}
              className="inline-block px-3 py-1.5 bg-bg-card border border-border rounded-lg font-mono text-[11px] uppercase text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
            >
              {g.canonical}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
