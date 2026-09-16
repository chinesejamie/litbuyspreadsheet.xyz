import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import BuyLink from "@/components/BuyLink";
import ProductGrid from "@/components/ProductGrid";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getProductBySlug, getRelatedProducts } from "@/lib/productFetcher";
import { isIndexableProduct } from "@/lib/productQuality";
import { generatePageMetadata } from "@/lib/metadata";
import { productSchema, breadcrumbListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { categorySlug, LANDING_CATEGORIES } from "@/lib/categoryGroups";
import { getCategoryGuideByCanonical } from "@/content/categories";
import ProductGallery from "./ProductGallery";
import RecentlyViewed from "./RecentlyViewed";

// Revalidate every hour — product data changes infrequently
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 60 ? cut.lastIndexOf(" ") : max).trim()}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | LitBuy Spreadsheet", robots: { index: false } };
  }

  const indexable = isIndexableProduct(product);
  const title = `${product.name} — ${product.category} | LitBuy Spreadsheet`;
  const description = product.description
    ? truncate(product.description, 155)
    : `${product.name}: ${product.category.toLowerCase()} find on the LitBuy Spreadsheet, about $${product.price.toFixed(2)} via LitBuy${product.store ? ` from ${product.store}` : ""}. Sizing, QC and ordering notes included.`;

  return generatePageMetadata({
    title,
    description,
    path: `/litbuy-spreadsheet/${slug}`,
    canonicalPath: `/litbuy-spreadsheet/${slug}`,
    image: product.mainImage,
    type: "article",
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "litbuy spreadsheet",
      "litbuy find",
    ],
    // Dünne Produktseiten (keine Beschreibung) bleiben erreichbar, werden
    // aber nicht indexiert — siehe lib/productQuality.ts.
    noindex: !indexable,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const pageUrl = absoluteUrl(`/litbuy-spreadsheet/${slug}`);
  const indexable = isIndexableProduct(product);
  const hasLanding = LANDING_CATEGORIES.includes(product.category);
  const categoryHref = hasLanding
    ? `/categories/${categorySlug(product.category)}`
    : `/litbuy-spreadsheet?category=${encodeURIComponent(product.category)}`;
  const guide = getCategoryGuideByCanonical(product.category);
  const related = await getRelatedProducts(product.category, product._id, 8);

  const breadcrumb = hasLanding
    ? [
        { name: "Home", url: absoluteUrl("/") },
        { name: "Categories", url: absoluteUrl("/categories") },
        { name: product.category, url: absoluteUrl(categoryHref) },
        { name: product.name, url: pageUrl },
      ]
    : [
        { name: "Home", url: absoluteUrl("/") },
        { name: "LitBuy Spreadsheet", url: absoluteUrl("/litbuy-spreadsheet") },
        { name: product.name, url: pageUrl },
      ];

  const schemas: object[] = [breadcrumbListSchema(breadcrumb)];
  // Product-Rich-Result nur für indexierbare Seiten — sonst füttern wir
  // Google tausende Produkt-Snippets ohne Inhalt.
  if (indexable) {
    schemas.unshift(
      productSchema({
        name: product.name,
        description: product.description,
        price: product.price,
        currency: "USD",
        images: product.images,
        url: pageUrl,
        sku: product._id,
      })
    );
  }

  const tipHeadings = guide?.buyingTips.map((t) => t.heading) ?? [];

  return (
    <>
      <SchemaScript schema={schemas} id="product-schema" />
      <div className="max-w-6xl mx-auto px-5 py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-muted">
            {breadcrumb.map((b, i) => {
              const last = i === breadcrumb.length - 1;
              const href = b.url.replace(absoluteUrl("/").replace(/\/$/, ""), "") || "/";
              return (
                <li key={b.url} className="flex items-center gap-2">
                  {last ? (
                    <span className="text-accent font-bold truncate max-w-[240px]" aria-current="page">
                      {b.name}
                    </span>
                  ) : (
                    <>
                      <Link href={href} className="text-text-secondary hover:text-accent transition-colors">
                        {b.name}
                      </Link>
                      <span aria-hidden="true" className="text-accent font-bold">&#9654;</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col gap-4">
            <Link
              href={categoryHref}
              className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent hover:underline w-fit"
            >
              {product.category}
            </Link>
            <h1 className="text-[clamp(22px,4vw,32px)] font-bold uppercase tracking-tight">
              {product.name}
            </h1>

            <dl className="flex gap-2 flex-wrap text-[11px] font-mono uppercase">
              {product.store && (
                <div className="px-3 py-1.5 bg-bg-elevated rounded-lg text-text-secondary">
                  <dt className="sr-only">Marketplace</dt>
                  <dd>{product.store}</dd>
                </div>
              )}
              {product.creatorName && (
                <div className="px-3 py-1.5 bg-bg-elevated rounded-lg text-text-secondary">
                  <dt className="sr-only">Listed by</dt>
                  <dd>Listed by {product.creatorName}</dd>
                </div>
              )}
              <div className="px-3 py-1.5 bg-bg-elevated rounded-lg text-text-secondary">
                <dt className="sr-only">Price</dt>
                <dd>≈ ${product.price.toFixed(2)} USD</dd>
              </div>
            </dl>

            {product.description ? (
              <p className="text-text-secondary text-sm leading-relaxed">{product.description}</p>
            ) : (
              <p className="text-text-secondary text-sm leading-relaxed">
                Community find listed on the LitBuy Spreadsheet. The seller&rsquo;s own
                photos, size chart and colour options are on the LitBuy product page —
                open it below, then come back to the{" "}
                <Link href={categoryHref} className="text-accent hover:underline">
                  {product.category.toLowerCase()} buying guide
                </Link>{" "}
                for sizing and QC advice before you pay.
              </p>
            )}

            <BuyLink
              href={product.litbuyLink}
              product={product}
              location="product_page"
              ariaLabel={`Buy ${product.name} on LitBuy for about $${product.price.toFixed(2)}`}
              className="block py-4 px-8 bg-accent text-bg-primary font-mono text-lg font-bold uppercase tracking-wider text-center rounded-lg hover:bg-accent-hover transition-colors shadow-[0_0_30px_rgba(255,227,77,0.25)]"
            >
              ${product.price.toFixed(2)} — Buy on LitBuy
            </BuyLink>
            <p className="text-[11px] font-mono uppercase text-text-muted">
              Price converted from CNY at a fixed rate. LitBuy shows the live price at checkout.
            </p>

            <section className="mt-4 p-5 border border-border rounded-xl bg-bg-secondary/30">
              <h2 className="font-mono text-sm font-black uppercase mb-3">
                How to order this item
              </h2>
              <ol className="space-y-2 text-sm text-text-secondary leading-relaxed list-decimal pl-5">
                <li>
                  Click <strong className="text-white">Buy on LitBuy</strong>. The listing opens on
                  LitBuy with the seller&rsquo;s photos and size chart.
                </li>
                <li>
                  Pick size and colour, add to cart and pay. New to LitBuy? Start with the{" "}
                  <Link href="/tutorial" className="text-accent hover:underline">
                    four-step ordering tutorial
                  </Link>
                  .
                </li>
                <li>
                  Wait for the item to reach the warehouse, then check the{" "}
                  <Link href="/tutorial/qc-photos" className="text-accent hover:underline">
                    QC photos
                  </Link>
                  {tipHeadings.length > 0
                    ? ` — the ${product.category.toLowerCase()} guide covers ${tipHeadings
                        .map((h) => h.toLowerCase())
                        .join(", ")}.`
                    : "."}
                </li>
                <li>
                  Choose a{" "}
                  <Link href="/tutorial/shipping-lines-explained" className="text-accent hover:underline">
                    shipping line
                  </Link>{" "}
                  and declare a sensible{" "}
                  <Link href="/tutorial/customs-declaration" className="text-accent hover:underline">
                    customs value
                  </Link>
                  .
                </li>
              </ol>
            </section>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mb-16" aria-labelledby="related-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <h2 id="related-heading" className="font-mono text-xl font-bold uppercase">
                More <span className="text-accent">{product.category}</span> finds
              </h2>
              <Link href={categoryHref} className="font-mono text-xs uppercase text-text-secondary hover:text-accent">
                All {product.category.toLowerCase()} →
              </Link>
            </div>
            <ProductGrid products={related} location="product_page" />
          </section>
        )}

        {guide && (
          <section className="mb-16 p-6 border border-border rounded-xl bg-bg-secondary/30 max-w-3xl">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-2">
              Before you buy {product.category.toLowerCase()}
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              {guide.buyingTips[0]?.body}
            </p>
            <Link href={categoryHref} className="text-accent hover:underline text-sm font-bold">
              Read the full {product.category.toLowerCase()} guide: {tipHeadings.join(", ")}
            </Link>
          </section>
        )}

        <RecentlyViewed currentId={product._id} />
      </div>
      <Footer />
    </>
  );
}
