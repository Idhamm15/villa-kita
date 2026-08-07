import { NextRequest, NextResponse } from "next/server";
import { authorizeUser, responseAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authorizeUser(req);

    return NextResponse.json({
      status: true,
      message: "Success",
      data: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.avatar,
      },
    });
  } catch (error) {
    const response = responseAuth(error);

    if (response) return response;

    console.error(error);

    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}