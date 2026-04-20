import { NextRequest, NextResponse } from "next/server";
import type { PipelineStage } from "mongoose";
import dbConnect from "@/lib/mongodb";
import FindsProduct from "@/models/FindsProduct";
import { serializeProduct, type ProductLite } from "@/lib/productFetcher";
import { expandCategory } from "@/lib/categoryGroups";

export const dynamic = "force-dynamic";

/**
 * Listing endpoint for the productList collection.
 * Ported from OOPBUY's `/api/products` route:
 *   - regex search across name/description/creatorName/id
 *   - category + creatorName filters
 *   - boost-aware aggregation pipeline
 *   - `searchPriority` tiebreaker when a search term is present
 *
 * Response shape:
 *   {
 *     products: (ProductLite & { link: string; total: number; brand: string })[],
 *     totalProducts: number,
 *     total: number,            // alias — legacy client compat
 *     pagination: { page, limit, hasMore }
 *   }
 *
 * Legacy aliases (`link`, `total`, `brand`) are kept so existing client
 * components (ProductCard, ProductModal, /products page) keep working
 * without an explicit rewrite — they read those field names today.
 */

const HOMEPAGE_BOOST_PAGE_ID = "696f4c61ea5d31d66e946edb";
const MAX_LIMIT = 100;

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const creatorName = searchParams.get("creatorName") || "";
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const requestedLimit = Number(searchParams.get("limit") ?? "30");
    const limit = Math.min(Math.max(1, requestedLimit), MAX_LIMIT);

    const now = new Date();

    // Base query — always filter hidden products.
    const mongoQuery: Record<string, unknown> = { hidden: { $ne: true } };

    if (search) {
      // Escape regex metacharacters so searches like "AF1 (G5)" don't crash
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rx = new RegExp(escaped, "i");
      mongoQuery.$or = [
        { name: { $regex: rx } },
        { description: { $regex: rx } },
        { creatorName: { $regex: rx } },
        { id: { $regex: rx } },
      ];
    }
    if (category && category !== "All") {
      // Expand a canonical category (e.g. "T-Shirts") into all underlying
      // DB aliases ("T-Shirts", "T", "camisetas") so a single user-facing
      // tab surfaces every relevant product.
      const expanded = expandCategory(category);
      if (expanded.length === 1) {
        mongoQuery.category = expanded[0];
      } else if (expanded.length > 1) {
        mongoQuery.category = { $in: expanded };
      }
    }
    if (creatorName) {
      mongoQuery.creatorName = new RegExp(creatorName, "i");
    }

    // Count filtered results (for pagination UI).
    const totalProducts = await FindsProduct.countDocuments(mongoQuery);

    // Boost-aware aggregation pipeline.
    const pipeline: PipelineStage[] = [
      { $match: mongoQuery },
      {
        $addFields: {
          totalBoostForPage: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: { $ifNull: ["$boosts", []] },
                    as: "b",
                    cond: {
                      $and: [
                        { $eq: ["$$b.boostPage", HOMEPAGE_BOOST_PAGE_ID] },
                        { $gt: ["$$b.validUntil", now] },
                      ],
                    },
                  },
                },
                as: "validBoost",
                in: "$$validBoost.amount",
              },
            },
          },
        },
      },
      {
        $sort: {
          totalBoostForPage: -1,
          ...(search ? { searchPriority: -1 } : {}),
          _id: -1,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const docs = await FindsProduct.aggregate(pipeline);
    const normalized: ProductLite[] = (docs as unknown[]).map(serializeProduct);

    // Legacy-compatible shape — components read `link`, `brand`, `subcategory`.
    const products = normalized.map((p) => ({
      ...p,
      link: p.litbuyLink,
      brand: p.creatorName, // creatorName doubles as "brand" label in the legacy UI
      subcategory: "",
    }));

    return NextResponse.json({
      products,
      totalProducts,
      total: totalProducts, // legacy alias
      page,
      pages: Math.max(1, Math.ceil(totalProducts / limit)),
      pagination: {
        page,
        limit,
        hasMore: products.length === limit,
      },
    });
  } catch (err) {
    console.error("[api/products] GET failed:", err);
    return NextResponse.json(
      {
        products: [],
        totalProducts: 0,
        total: 0,
        page: 1,
        pages: 1,
        pagination: { page: 1, limit: 30, hasMore: false },
      },
      { status: 200 }
    );
  }
}
