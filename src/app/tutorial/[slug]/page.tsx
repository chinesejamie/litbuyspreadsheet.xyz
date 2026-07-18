import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, faqPageSchema, techArticleSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { TUTORIAL_PAGES, getTutorialPage } from "@/content/tutorials";
import { LITBUY_AUTHOR, LITBUY_LAST_UPDATED } from "@/content/litbuy";

export async function generateStaticParams() {
  return TUTORIAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTutorialPage(slug);
  if (!page) return { title: "Not found" };
  return generatePageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/tutorial/${page.slug}`,
    canonicalPath: `/tutorial/${page.slug}`,
    keywords: page.keywords,
    type: "article",
  });
}

export default async function TutorialSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getTutorialPage(slug);
  if (!page) notFound();

  const url = absoluteUrl(`/tutorial/${page.slug}`);

  const schemas = [
    techArticleSchema({
      url,
      headline: page.h1,
      description: page.metaDescription,
      authorName: LITBUY_AUTHOR,
      dateModified: LITBUY_LAST_UPDATED,
      datePublished: "2026-04-28",
    }),
    breadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Tutorial", url: absoluteUrl("/tutorial") },
      { name: page.h1, url },
    ]),
    faqPageSchema(page.faq.map((f) => ({ question: f.q, answer: f.a }))),
  ];

  const otherPages = TUTORIAL_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <>
      <SchemaScript schema={schemas} id={`tutorial-${page.slug}-schema`} />
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
              <Link href="/tutorial" className="hover:text-accent">
                Tutorial
              </Link>
            </li>
            <li>/</li>
            <li className="text-text-primary truncate max-w-[200px]" title={page.h1}>
              {page.h1}
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
              /tutorial/{page.slug}
            </div>
            <h1 className="text-[clamp(34px,7vw,60px)] font-black uppercase leading-none tracking-tight mb-5">
              {page.h1}
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              {page.tagline}
            </p>
          </header>

          <section className="mb-12">
            <p className="text-text-primary text-base leading-relaxed">{page.hero}</p>
          </section>

          {page.sections.map((s, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">
                {s.heading}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">{s.body}</p>
            </section>
          ))}

          <section className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-5">FAQ</h2>
            <div className="space-y-4">
              {page.faq.map((f, i) => (
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
              Ready to order?
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Browse 10,000+ verified listings in the{" "}
              <a
                href="https://lit-buy-spreadsheet.com/litbuy-spreadsheet"
                target="_blank"
                rel="noopener"
                className="text-accent hover:underline"
              >
                LitBuy Spreadsheet
              </a>
              . Or pick an{" "}
              <Link href="/outfits" className="text-accent hover:underline">
                outfit guide
              </Link>{" "}
              to build a complete look.
            </p>
          </section>

          <nav aria-label="Other tutorial pages" className="mt-16">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">
              Other Tutorial Topics
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/tutorial/${p.slug}`}
                    className="block p-4 border border-border rounded-lg hover:border-accent transition-colors"
                  >
                    <div className="font-bold text-sm">{p.h1}</div>
                    <div className="text-xs text-text-secondary mt-1">{p.tagline}</div>
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
