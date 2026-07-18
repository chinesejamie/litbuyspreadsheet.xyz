import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { techArticleSchema, breadcrumbListSchema, itemListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import TutorialContent from "./TutorialContent";
import { TUTORIAL_PAGES } from "@/content/tutorials";

export const metadata: Metadata = generatePageMetadata({
  title: "How to Order from LitBuy — Step-by-Step Tutorial & Topic Guides",
  description:
    "Complete LitBuy ordering tutorial plus deep-dive guides on QC photos, customs declarations, shipping lines, seller verification and your first haul checklist.",
  path: "/tutorial",
  canonicalPath: "/tutorial",
});

const schemas = [
  techArticleSchema({
    url: absoluteUrl("/tutorial"),
    headline: "How to Order from LitBuy — Step-by-Step Tutorial",
    description:
      "Complete step-by-step guide to placing your first order via the LitBuy shopping agent. Covers account setup, finding products, QC photos, and international shipping.",
    authorName: "Miki",
    dateModified: "2026-04-28",
    datePublished: "2025-01-01",
  }),
  breadcrumbListSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Tutorial", url: absoluteUrl("/tutorial") },
  ]),
  itemListSchema(
    TUTORIAL_PAGES.map((p) => ({
      name: p.h1,
      url: absoluteUrl(`/tutorial/${p.slug}`),
    }))
  ),
];

export default function TutorialPage() {
  return (
    <>
      <SchemaScript schema={schemas} id="tutorial-schema" />
      <TutorialContent />
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
          Deep-dive Tutorial Topics
        </h2>
        <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-2xl">
          The step-by-step above covers the basics. Below are focused guides on the
          parts of the process that trip up most new buyers.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {TUTORIAL_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/tutorial/${p.slug}`}
                className="group block p-5 border border-border rounded-xl hover:border-accent transition-colors"
              >
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {p.h1}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {p.tagline}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}
