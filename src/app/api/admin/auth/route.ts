import { NextRequest, NextResponse } from "next/server";
import { createToken, verifyToken, COOKIE_NAME } from "@/lib/adminAuth";

const TOKEN_MAX_AGE = 604800;

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = createToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: TOKEN_MAX_AGE,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return response;
}
