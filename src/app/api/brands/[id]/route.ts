import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Brand from "@/models/Brand";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const brand = await Brand.findById(id).lean();
  if (!brand) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ brand });
}
