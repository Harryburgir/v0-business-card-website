import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, COOKIE_OPTIONS } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Haslo jest wymagane" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Nieprawidlowe haslo" },
        { status: 401 }
      );
    }

    const token = await createSession();
    console.log("[v0] Login successful, creating session token");

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_OPTIONS.name, token, {
      httpOnly: COOKIE_OPTIONS.httpOnly,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
      path: COOKIE_OPTIONS.path,
      maxAge: COOKIE_OPTIONS.maxAge,
    });
    
    console.log("[v0] Cookie set with name:", COOKIE_OPTIONS.name);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Wystapil blad podczas logowania" },
      { status: 500 }
    );
  }
}
