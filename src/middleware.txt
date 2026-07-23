import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("access_token")?.value;

  const pathname = request.nextUrl.pathname;

  // Belum login -> tidak boleh ke dashboard
  if (
    pathname.startsWith("/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Sudah login -> tidak boleh ke login
  if (
    pathname === "/login" &&
    token
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
  ],
};