import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import {
  breadcrumbListSchema,
  faqPageSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/productFetcher";
import { CATEGORY_GUIDES, getCategoryGuide } from "@/content/categories";
import { OUTFIT_GUIDES } from "@/content/outfits";
import { TUTORIAL_PAGES } from "@/content/tutorials";

// Editorial part is static; listings refresh hourly via ISR.
export const revalidate = 3600;

const PAGE_SIZE = 24;
const PAGE_DATE = "2026-09-16";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_GUIDES.map((g) => ({ slug: g.slug }));
}

function parsePage(raw: string | undefined): number {
  const n = Number(raw ?? "1");
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const guide = getCategoryGuide(slug);
  if (!guide) return { title: "Category not found" };

  const page = parsePage(rawPage);
  const path = `/categories/${guide.slug}`;

  // Paginierte Seiten: erreichbar und verfolgbar, aber nicht indexierbar —
  // sonst entstehen pro Kategorie dutzende fast identische Listen-URLs.
  return generatePageMetadata({
    title: page > 1 ? `${guide.title} — Page ${page}` : guide.title,
    description: guide.metaDescription,
    path: page > 1 ? `${path}?page=${page}` : path,
    canonicalPath: path,
    keywords: guide.keywords,
    image: guide.image,
    noindex: page > 1,
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const guide = getCategoryGuide(slug);
  if (!guide) notFound();

  const page = parsePage(rawPage);
  const listing = await getProductsByCategory(guide.canonical, {
    page,
    limit: PAGE_SIZE,
  });

  const url = absoluteUrl(`/categories/${guide.slug}`);
  const relatedOutfits = OUTFIT_GUIDES.filter((o) =>
    guide.relatedOutfits.includes(o.slug)
  );
  const relatedTutorials = TUTORIAL_PAGES.filter((t) =>
    guide.relatedTutorials.includes(t.slug)
  );
  const otherGuides = CATEGORY_GUIDES.filter((g) => g.slug !== guide.slug);

  const schemas: object[] = [
    webPageSchema({
      url,
      name: guide.h1,
      description: guide.metaDescription,
      dateModified: PAGE_DATE,
    }),
    breadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Categories", url: absoluteUrl("/categories") },
      { name: guide.canonical, url },
    ]),
    faqPageSchema(guide.faq.map((f) => ({ question: f.q, answer: f.a }))),
  ];
  if (listing.products.length > 0) {
    schemas.push(
      itemListSchema(
        listing.products.map((p) => ({
          name: p.name,
          url: absoluteUrl(`/litbuy-spreadsheet/${p.slug}`),
        }))
      )
    );
  }

  const hasPrev = page > 1;
  const hasNext = page < listing.pages;
  const pageHref = (n: number) =>
    n <= 1 ? `/categories/${guide.slug}` : `/categories/${guide.slug}?page=${n}`;

  return (
    <>
      <SchemaScript schema={schemas} id={`category-${guide.slug}-schema`} />
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/categories" className="hover:text-accent">
                Categories
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white" aria-current="page">
              {guide.canonical}
            </li>
          </ol>
        </nav>

        <article>
          <header className="grid gap-8 md:grid-cols-[1fr_260px] items-start mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
                /categories/{guide.slug}
              </div>
              <h1 className="text-[clamp(34px,7vw,60px)] font-black uppercase leading-none tracking-tight mb-4">
                {guide.h1}
              </h1>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                {guide.tagline}
              </p>
              <div className="space-y-4 max-w-3xl">
                {guide.intro.map((para, i) => (
                  <p key={i} className="text-text-primary text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="hidden md:block bg-bg-card border border-border rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guide.image}
                alt={`${guide.canonical} on the LitBuy Spreadsheet`}
                width={260}
                height={200}
                className="w-full h-[200px] object-contain bg-bg-elevated"
              />
            </div>
          </header>

          <section className="mb-14 max-w-3xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">
              What you will find
            </h2>
            <ul className="space-y-2.5">
              {guide.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-text-secondary text-base leading-relaxed">
                  <span aria-hidden="true" className="text-accent font-bold shrink-0">
                    &#9654;
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-14" aria-labelledby="listings-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <h2 id="listings-heading" className="text-2xl font-bold uppercase tracking-tight">
                Latest {guide.canonical} listings
                {page > 1 ? ` — page ${page}` : ""}
              </h2>
              {listing.total > 0 && (
                <p className="font-mono text-[11px] uppercase text-text-muted">
                  {listing.total.toLocaleString("en-US")} listings in the spreadsheet
                </p>
              )}
            </div>

            <ProductGrid products={listing.products} location="category_page" />

            {(hasPrev || hasNext) && (
              <nav aria-label="Listing pages" className="mt-8 flex items-center justify-between gap-4">
                {hasPrev ? (
                  <Link
                    href={pageHref(page - 1)}
                    rel="prev"
                    className="px-6 py-3 border border-border rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-text-secondary hover:border-accent hover:text-accent transition-colors"
                  >
                    Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="font-mono text-[11px] uppercase text-text-muted">
                  Page {page} of {listing.pages}
                </span>
                {hasNext ? (
                  <Link
                    href={pageHref(page + 1)}
                    rel="next"
                    className="px-6 py-3 border border-border rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-text-secondary hover:border-accent hover:text-accent transition-colors"
                  >
                    Next
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}

            <p className="mt-6 text-sm text-text-secondary">
              Want to search or sort? Open{" "}
              <Link
                href={`/litbuy-spreadsheet?category=${encodeURIComponent(guide.canonical)}`}
                className="text-accent hover:underline"
              >
                {guide.canonical} in the interactive spreadsheet
              </Link>
              .
            </p>
          </section>

          <section className="mb-14 max-w-3xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">
              How to buy {guide.canonical.toLowerCase()} through LitBuy
            </h2>
            <div className="space-y-8">
              {guide.buyingTips.map((tip, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-2">
                    {tip.heading}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14 max-w-3xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-5">FAQ</h2>
            <div className="space-y-4">
              {guide.faq.map((f, i) => (
                <details key={i} className="p-4 border border-border rounded-lg">
                  <summary className="cursor-pointer font-bold text-base list-none">{f.q}</summary>
                  <p className="text-text-secondary text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {(relatedOutfits.length > 0 || relatedTutorials.length > 0) && (
            <section className="mb-14 grid gap-6 md:grid-cols-2">
              {relatedOutfits.length > 0 && (
                <div className="p-6 border border-border rounded-xl bg-bg-secondary/30">
                  <h2 className="text-lg font-bold uppercase tracking-tight mb-3">
                    Outfits that use {guide.canonical.toLowerCase()}
                  </h2>
                  <ul className="space-y-2">
                    {relatedOutfits.map((o) => (
                      <li key={o.slug}>
                        <Link href={`/outfits/${o.slug}`} className="text-accent hover:underline text-sm">
                          {o.h1}
                        </Link>
                        <span className="text-text-muted text-xs"> — {o.tagline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedTutorials.length > 0 && (
                <div className="p-6 border border-border rounded-xl bg-bg-secondary/30">
                  <h2 className="text-lg font-bold uppercase tracking-tight mb-3">
                    Read before you order
                  </h2>
                  <ul className="space-y-2">
                    {relatedTutorials.map((t) => (
                      <li key={t.slug}>
                        <Link href={`/tutorial/${t.slug}`} className="text-accent hover:underline text-sm">
                          {t.h1}
                        </Link>
                        <span className="text-text-muted text-xs"> — {t.tagline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <nav aria-label="Other categories">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Other categories</h2>
            <ul className="flex flex-wrap gap-2">
              {otherGuides.map((g) => (
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
        </article>
      </div>
      <Footer />
    </>
  );
}
