import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Brand from "@/models/Brand";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const filterOnly = searchParams.get("filter") === "true";
  const query = filterOnly ? { inFilter: true } : {};
  const brands = await Brand.find(query).sort({ name: 1 }).lean();
  return NextResponse.json({ brands });
}
