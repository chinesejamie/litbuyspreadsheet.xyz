import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { generatePageMetadata } from "@/lib/metadata";
import { techArticleSchema, breadcrumbListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import TutorialContent from "./TutorialContent";

export const metadata: Metadata = generatePageMetadata({
  title: "How to Order from LitBuy — Step-by-Step Tutorial",
  description:
    "Step-by-step LitBuy Spreadsheet ordering tutorial: signup, browse, paste links, QC, ship. Get 70% off shipping on your first LitBuy haul.",
  path: "/tutorial",
  canonicalPath: "/tutorial",
});

const schemas = [
  techArticleSchema({
    url: absoluteUrl("/tutorial"),
    headline: "How to Order from LitBuy Spreadsheet — Step-by-Step Tutorial",
    description:
      "Complete step-by-step guide to placing your first order via the LitBuy Spreadsheet. Covers account setup, finding products, QC photos, and international shipping.",
    authorName: "Miki",
    dateModified: "2026-04-01",
    datePublished: "2025-01-01",
  }),
  breadcrumbListSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Tutorial", url: absoluteUrl("/tutorial") },
  ]),
];

export default function TutorialPage() {
  return (
    <>
      <SchemaScript schema={schemas} id="tutorial-schema" />
      <TutorialContent />
      <Footer />
    </>
  );
}
