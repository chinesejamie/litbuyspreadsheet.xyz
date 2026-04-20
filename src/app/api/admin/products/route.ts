import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/adminAuth";
import { detectPlatform } from "@/lib/litbuy";

export async function GET(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
  ]);

  return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const body = await req.json();

  if (body.link) {
    const detected = detectPlatform(body.link);
    if (detected) {
      const storeMap: Record<string, string> = { "0": "1688", "1": "Taobao", "weidian": "Weidian" };
      body.store = storeMap[detected.platform] || detected.platform;
      body.storeProductId = detected.productId;
    } else {
      try {
        const host = new URL(body.link).hostname.replace("www.", "");
        body.store = host;
        body.storeProductId = "";
      } catch { /* ignore */ }
    }
  }

  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}
