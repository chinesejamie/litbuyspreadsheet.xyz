import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const HEADERS: Record<string, string> = {
  Accept: "application/json, */*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

async function downloadImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": HEADERS["User-Agent"],
        Referer: url,
      },
    });
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") || "";
    let ext = ".jpg";
    if (contentType.includes("png")) ext = ".png";
    else if (contentType.includes("webp")) ext = ".webp";
    else if (contentType.includes("gif")) ext = ".gif";

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 100) return null; // skip tiny/broken responses

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    return `/uploads/${filename}`;
  } catch {
    return null;
  }
}

function detectPlatform(link: string) {
  if (link.includes("weidian.com")) return "Weidian";
  if (link.includes("1688.com")) return "1688";
  if (link.includes("taobao.com")) return "Taobao";
  if (link.startsWith("https://k.youshop10.com/")) return "Youshop10";
  return null;
}

function extractProductId(link: string, platform: string) {
  switch (platform) {
    case "Weidian": {
      const m = link.match(/itemID=(\d+)/);
      return m ? m[1] : null;
    }
    case "1688": {
      const m = link.match(/offer\/(\d+)/);
      return m ? m[1] : null;
    }
    case "Taobao": {
      const m = link.match(/id=(\d+)/);
      return m ? m[1] : null;
    }
    default:
      return null;
  }
}

async function resolveYoushop10(link: string) {
  const res = await fetch(link, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": HEADERS["User-Agent"],
    },
    redirect: "manual",
  });
  const location = res.headers.get("location");
  if (location && location.includes("itemID=")) return location;
  throw new Error("Could not resolve Youshop10 link");
}

async function fetchWeidianData(itemId: string) {
  const apiUrl = `https://thor.weidian.com/detail/getItemSkuInfo/1.0?param=%7B%22itemId%22%3A%22${itemId}%22%7D&wdtoken=7dd54a84&_=${Date.now()}`;
  const res = await fetch(apiUrl, { headers: HEADERS });
  const json = await res.json();
  const data = json.result || {};
  return {
    name: data.itemTitle || "",
    price: Math.floor((data.itemOriginalHighPrice || 0) / 100),
    images: [data.itemMainPic, ...(data.itemSubPics || [])].filter(Boolean),
  };
}

async function fetch1688Data(productId: string) {
  const apiUrl = `https://joyabuy.com/search-info/get-1688-shop-products?ProductId=${productId}&Page=1&Language=en`;
  const res = await fetch(apiUrl, { headers: HEADERS });
  const json = await res.json();
  if (json.code === 200 && json.data?.productList?.length > 0) {
    const product = json.data.productList[0];
    return {
      name: product.name || "",
      price: parseFloat(product.price) || 0,
      images: [product.imgUrl].filter(Boolean),
    };
  }
  throw new Error("No product data found on 1688");
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { link } = await req.json();
    if (!link) {
      return NextResponse.json(
        { error: "Link is required" },
        { status: 400 }
      );
    }

    let resolvedLink = link.trim();
    let platform = detectPlatform(resolvedLink);

    if (platform === "Youshop10") {
      resolvedLink = await resolveYoushop10(resolvedLink);
      platform = "Weidian";
    }

    if (!platform) {
      return NextResponse.json(
        { error: "Unsupported link. Use Weidian, 1688, or Taobao URLs." },
        { status: 400 }
      );
    }

    const productId = extractProductId(resolvedLink, platform);
    if (!productId) {
      return NextResponse.json(
        { error: `Could not extract product ID from ${platform} link` },
        { status: 400 }
      );
    }

    let productData;
    if (platform === "Weidian") {
      productData = await fetchWeidianData(productId);
    } else if (platform === "1688") {
      productData = await fetch1688Data(productId);
    } else if (platform === "Taobao") {
      return NextResponse.json(
        { error: "Taobao fetching is not supported yet" },
        { status: 501 }
      );
    }

    // Download external images locally so they don't get blocked by hotlinking protection
    if (productData?.images?.length) {
      const localImages = await Promise.all(
        productData.images.map((url: string) => downloadImage(url))
      );
      productData.images = localImages.filter(Boolean) as string[];
    }

    return NextResponse.json({
      success: true,
      data: { ...productData, store: platform, productId },
    });
  } catch (error) {
    console.error("Fetch link error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch product data",
      },
      { status: 500 }
    );
  }
}
