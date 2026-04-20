import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import {
  CANONICAL_CATEGORIES,
  CATEGORY_GROUPS,
} from "@/lib/categoryGroups";

export const dynamic = "force-dynamic";

/**
 * Returns the canonical category list for the /products tab bar,
 * each entry enriched with the actual product count across every alias
 * (e.g. "Shoes" aggregates "Shoes" + "shoes" + "Schuhe" + "Zapatos").
 *
 * Categories with zero matching products are filtered out so empty tabs
 * never appear in the UI.
 */
export async function GET() {
  try {
    await dbConnect();

    const entries = await Promise.all(
      CANONICAL_CATEGORIES.map(async (canonical) => {
        const aliases = CATEGORY_GROUPS[canonical] ?? [canonical];
        const count = await FindsProduct.countDocuments({
          hidden: { $ne: true },
          category: { $in: aliases },
        });
        return { name: canonical, count };
      })
    );

    // Drop empty groups and ship with the total count for the "All" tab.
    const categories = entries.filter((e) => e.count > 0);
    const total = await FindsProduct.countDocuments({
      hidden: { $ne: true },
    });

    return NextResponse.json({ total, categories });
  } catch (err) {
    console.error("[api/categories] GET failed:", err);
    return NextResponse.json({ total: 0, categories: [] }, { status: 200 });
  }
}
