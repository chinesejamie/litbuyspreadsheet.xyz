import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import {
  getProductBySlug,
  serializeProduct,
  type ProductLite,
} from "@/lib/productFetcher";

export const dynamic = "force-dynamic";

/**
 * Single-product lookup. Accepts either a MongoDB ObjectId or a slug
 * derived from `name`. Always returns a legacy-compatible shape with
 * `link`, `brand` and `subcategory` aliases so existing UI doesn't break.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    let product: ProductLite | null = null;

    // If the slug looks like an ObjectId, try that first.
    if (/^[0-9a-fA-F]{24}$/.test(slug)) {
      const byId = await FindsProduct.findById(slug).lean();
      if (byId) {
        product = serializeProduct(byId);
      }
    }

    // Otherwise resolve via the slug helper (name → slug match).
    if (!product) {
      product = await getProductBySlug(slug);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Legacy-compatible shape — keeps existing client consumers working.
    const legacy = {
      ...product,
      link: product.litbuyLink,
      brand: product.creatorName,
      subcategory: "",
    };

    return NextResponse.json({ product: legacy });
  } catch (err) {
    console.error("[api/products/[slug]] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
