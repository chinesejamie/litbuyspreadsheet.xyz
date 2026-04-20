import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Outfit from "@/models/Outfit";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get("creator") || "";
  const brandId = searchParams.get("brandId") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = { published: true };
  if (creator) query.creator = creator;

  if (brandId) {
    // Find brand name first
    const Brand = (await import("@/models/Brand")).default;
    const brand = await Brand.findById(brandId).lean() as { name: string } | null;
    if (brand) {
      const brandProducts = await Product.find({ brand: brand.name, isBrandProduct: true }).select("_id").lean();
      const brandProductIds = brandProducts.map((p) => p._id);
      query.products = { $in: brandProductIds };
      delete query.creator; // Don't filter by creator when filtering by brand
    }
  }

  const [outfits, total] = await Promise.all([
    Outfit.find(query).populate("products").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Outfit.countDocuments(query),
  ]);

  return NextResponse.json({ outfits, total, page, pages: Math.ceil(total / limit) });
}
