import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

const TOKEN_SECRET =
  process.env.ADMIN_TOKEN_SECRET || "fallback-dev-secret";
const TOKEN_MAX_AGE = 604800; // 7 days
const COOKIE_NAME = "micky_admin_token";

function createSignature(payload: string): string {
  return crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("hex");
}

export function createToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ admin: true, iat: Math.floor(Date.now() / 1000) })
  ).toString("base64");
  const signature = createSignature(payload);
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): boolean {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const expectedSig = createSignature(payload);
    if (signature !== expectedSig) return false;
    const data = JSON.parse(Buffer.from(payload, "base64").toString());
    const age = Math.floor(Date.now() / 1000) - data.iat;
    return age < TOKEN_MAX_AGE;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<NextResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export { COOKIE_NAME };
