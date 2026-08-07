import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    status: true,
    message: "Logout berhasil",
  });

  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("token");

  return response;
}