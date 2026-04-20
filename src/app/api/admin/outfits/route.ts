import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Outfit from "@/models/Outfit";
import { requireAdmin } from "@/lib/adminAuth";

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
    query.name = { $regex: search, $options: "i" };
  }

  const [outfits, total] = await Promise.all([
    Outfit.find(query)
      .populate("products")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Outfit.countDocuments(query),
  ]);

  return NextResponse.json({ outfits, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const body = await req.json();
  const outfit = await Outfit.create(body);
  const populated = await outfit.populate("products");
  return NextResponse.json(populated, { status: 201 });
}
