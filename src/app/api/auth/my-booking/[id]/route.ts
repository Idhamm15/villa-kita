import { NextRequest, NextResponse } from "next/server";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const user = await authorizeUser(req);

    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        product: true,
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            username: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          status: false,
          message: "Booking tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Success",
      data: booking,
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