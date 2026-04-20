import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Brand from "@/models/Brand";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const [brands, total] = await Promise.all([
    Brand.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Brand.countDocuments(),
  ]);

  return NextResponse.json({ brands, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const body = await req.json();
  const brand = await Brand.create(body);
  return NextResponse.json(brand, { status: 201 });
}
