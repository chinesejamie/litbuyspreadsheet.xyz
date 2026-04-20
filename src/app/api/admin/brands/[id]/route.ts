import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Brand from "@/models/Brand";
import { requireAdmin } from "@/lib/adminAuth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const brand = await Brand.findByIdAndUpdate(id, body, { new: true });
  if (!brand) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(brand);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
  await Brand.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
