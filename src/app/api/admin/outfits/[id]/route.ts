import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Outfit from "@/models/Outfit";
import { requireAdmin } from "@/lib/adminAuth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const outfit = await Outfit.findByIdAndUpdate(id, body, { new: true }).populate("products");
  if (!outfit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(outfit);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
  await Outfit.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
