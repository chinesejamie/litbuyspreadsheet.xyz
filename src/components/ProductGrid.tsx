import Link from "next/link";
import BuyLink from "./BuyLink";
import type { ProductLite } from "@/lib/productFetcher";

interface ProductGridProps {
  products: ProductLite[];
  location: "category_page" | "product_page";
  /** Heading level context — grids under an <h2> use <h3> for item names. */
  itemHeading?: "h3" | "h4";
  className?: string;
}

/**
 * Serverseitig gerendertes Produkt-Grid. Jede Karte enthält einen internen
 * Link auf die Produktseite und einen getrackten Kauf-Link. Kein Client-JS
 * außer dem BuyLink-Handler, damit Google alle Links im HTML sieht.
 */
export default function ProductGrid({
  products,
  location,
  itemHeading = "h3",
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center py-12 text-text-muted font-mono text-[13px] uppercase">
        Listings are loading from the database — check back in a moment.
      </p>
    );
  }

  const Heading = itemHeading;

  return (
    <ul
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none p-0 m-0 ${className}`}
    >
      {products.map((p) => (
        <li
          key={p._id}
          className="bg-bg-card rounded-xl overflow-hidden border border-border group hover:border-accent/30 transition-colors"
        >
          <Link
            href={`/litbuy-spreadsheet/${p.slug}`}
            className="block aspect-square bg-bg-elevated overflow-hidden"
          >
            {p.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.images[0]}
                alt={`${p.name} — ${p.category} find on the LitBuy Spreadsheet`}
                loading="lazy"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted font-mono text-[11px] uppercase">
                No image
              </div>
            )}
          </Link>
          <div className="p-4">
            <Heading className="font-mono text-[13px] font-bold uppercase leading-tight mb-1">
              <Link
                href={`/litbuy-spreadsheet/${p.slug}`}
                className="hover:text-accent transition-colors"
              >
                {p.name}
              </Link>
            </Heading>
            <p className="font-mono text-[11px] uppercase text-text-muted mb-3">
              {p.category}
              {p.store ? ` · ${p.store}` : ""}
            </p>
            <BuyLink
              href={p.litbuyLink}
              product={p}
              location={location}
              ariaLabel={`Buy ${p.name} on LitBuy for $${p.price.toFixed(2)}`}
              className="block w-full py-2.5 px-4 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wide text-center rounded-lg hover:bg-accent-hover transition-colors"
            >
              ${p.price.toFixed(2)}
            </BuyLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
