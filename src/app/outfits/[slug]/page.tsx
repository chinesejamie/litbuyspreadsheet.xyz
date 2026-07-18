import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, faqPageSchema, techArticleSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { OUTFIT_GUIDES, getOutfitGuide } from "@/content/outfits";
import { LITBUY_AUTHOR, LITBUY_LAST_UPDATED } from "@/content/litbuy";

export async function generateStaticParams() {
  return OUTFIT_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getOutfitGuide(slug);
  if (!guide) return { title: "Not found" };
  return generatePageMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: `/outfits/${guide.slug}`,
    canonicalPath: `/outfits/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function OutfitGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getOutfitGuide(slug);
  if (!guide) notFound();

  const url = absoluteUrl(`/outfits/${guide.slug}`);

  const schemas = [
    techArticleSchema({
      url,
      headline: guide.h1,
      description: guide.metaDescription,
      authorName: LITBUY_AUTHOR,
      dateModified: LITBUY_LAST_UPDATED,
      datePublished: "2026-04-28",
    }),
    breadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Outfit Guides", url: absoluteUrl("/outfits") },
      { name: guide.h1, url },
    ]),
    faqPageSchema(guide.faq.map((f) => ({ question: f.q, answer: f.a }))),
  ];

  const otherGuides = OUTFIT_GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <SchemaScript schema={schemas} id={`outfit-${guide.slug}-schema`} />
      <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/outfits" className="hover:text-accent">
                Outfits
              </Link>
            </li>
            <li>/</li>
            <li className="text-text-primary truncate max-w-[200px]" title={guide.h1}>
              {guide.h1}
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
              /outfits/{guide.slug}
            </div>
            <h1 className="text-[clamp(34px,7vw,60px)] font-black uppercase leading-none tracking-tight mb-5">
              {guide.h1}
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              {guide.tagline}
            </p>
          </header>

          <section className="mb-12">
            <p className="text-text-primary text-base leading-relaxed">{guide.hero}</p>
          </section>

          {guide.sections.map((s, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">
                {s.heading}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">{s.body}</p>
            </section>
          ))}

          <section className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-5">
              The Pieces
            </h2>
            <ul className="space-y-3">
              {guide.pieces.map((p, i) => (
                <li
                  key={i}
                  className="p-4 border border-border rounded-lg flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                      {p.role} · {p.platform}
                    </div>
                    <div className="font-bold text-base">{p.name}</div>
                    <div className="text-sm text-text-secondary mt-1">{p.note}</div>
                  </div>
                  <div className="font-mono text-sm text-text-primary whitespace-nowrap">
                    {p.typicalPriceUsd}
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-secondary mt-5 leading-relaxed">
              All listings can be found in the full{" "}
              <a
                href="https://lit-buy-spreadsheet.com/litbuy-spreadsheet"
                target="_blank"
                rel="noopener"
                className="text-accent hover:underline"
              >
                LitBuy Spreadsheet
              </a>{" "}
              — filter by category and platform to match this guide.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-5">FAQ</h2>
            <div className="space-y-4">
              {guide.faq.map((f, i) => (
                <details
                  key={i}
                  className="p-4 border border-border rounded-lg group"
                >
                  <summary className="cursor-pointer font-bold text-base list-none">
                    {f.q}
                  </summary>
                  <p className="text-text-secondary text-sm leading-relaxed mt-3">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12 p-6 border border-border rounded-xl bg-bg-secondary/30">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-3">
              Need help getting started?
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              First-time order? Read the{" "}
              <Link href="/tutorial" className="text-accent hover:underline">
                LitBuy ordering tutorial
              </Link>{" "}
              before placing this haul. For sizing across Chinese marketplaces,{" "}
              <a
                href="https://lit-buy-spreadsheet.com/sizing-guide"
                target="_blank"
                rel="noopener"
                className="text-accent hover:underline"
              >
                see the sizing guide on LitBuy Spreadsheet
              </a>
              .
            </p>
          </section>

          <nav aria-label="Other outfit guides" className="mt-16">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">
              Other Outfit Guides
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/outfits/${g.slug}`}
                    className="block p-4 border border-border rounded-lg hover:border-accent transition-colors"
                  >
                    <div className="font-bold text-sm">{g.h1}</div>
                    <div className="text-xs text-text-secondary mt-1">{g.tagline}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
