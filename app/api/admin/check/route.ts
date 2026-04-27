import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_OPTIONS } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_OPTIONS.name)?.value;
  console.log("[v0] Check auth - cookie name:", COOKIE_OPTIONS.name, "token exists:", !!token);
  
  if (!token) {
    console.log("[v0] No token found in cookies");
    return NextResponse.json({ authenticated: false });
  }
  
  const authenticated = await verifySession(token);
  console.log("[v0] Token verification result:", authenticated);
  return NextResponse.json({ authenticated });
}
