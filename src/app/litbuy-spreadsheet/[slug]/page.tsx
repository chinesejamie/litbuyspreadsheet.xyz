import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getProductBySlug } from "@/lib/productFetcher";
import { generatePageMetadata } from "@/lib/metadata";
import { productSchema, breadcrumbListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import ProductDetailClient from "./ProductDetailClient";

// Revalidate every hour — product data changes infrequently
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | LitBuy Spreadsheet" };
  }

  const title = `${product.name} — Buy on LitBuy Spreadsheet`;
  const description = `${product.name} in the ${product.category} category. Verified find on LitBuy Spreadsheet — click to buy via LitBuy for $${product.price.toFixed(2)}.`;

  return generatePageMetadata({
    title,
    description,
    path: `/litbuy-spreadsheet/${slug}`,
    canonicalPath: `/litbuy-spreadsheet/${slug}`,
    image: product.mainImage,
    type: "article", // closest standard OG type for product detail pages
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "litbuy spreadsheet",
      "litbuy find",
      "rep find",
    ],
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/litbuy-spreadsheet/${slug}`);

  const schemas = [
    productSchema({
      name: product.name,
      description: `${product.name} — ${product.category} find on LitBuy Spreadsheet. Verified link, buy via LitBuy.`,
      price: product.price,
      currency: "USD",
      images: product.images,
      url: pageUrl,
      sku: product._id,
    }),
    breadcrumbListSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "LitBuy Spreadsheet", url: absoluteUrl("/litbuy-spreadsheet") },
      { name: product.name, url: pageUrl },
    ]),
  ];

  return (
    <>
      <SchemaScript schema={schemas} id="product-schema" />
      <ProductDetailClient product={product} slug={slug} />
      <Footer />
    </>
  );
}
