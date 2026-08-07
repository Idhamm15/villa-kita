import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function isTokenValid(token?: string | null) {
  if (!token) return false;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    console.log("TOKEN VALID", payload);

    return true;
  } catch (e) {
    console.log("TOKEN INVALID", e);

    return false;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;

  // ==========================
  // Dashboard
  // ==========================
  if (pathname.startsWith("/dashboard")) {
    // Belum login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Sudah login tapi bukan admin
    if (!["ADMIN", "OWNER"].includes(role ?? "")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  // ==========================
  // Login
  // ==========================
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(
        new URL(
          ["ADMIN", "OWNER"].includes(role ?? "")
            ? "/dashboard"
            : "/",
          req.url
        )
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};