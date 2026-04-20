import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/adminAuth";
import { detectPlatform } from "@/lib/litbuy";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
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

  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const { id } = await params;
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
