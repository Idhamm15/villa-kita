import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";

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

    const purchase = await prisma.booking.findFirst({
      where: {
        id,
        userId: user.id,
        paymentStatus: PaymentStatus.PAID,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            thumbnail: true,
            price: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            fullname: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!purchase) {
      return NextResponse.json(
        {
          status: false,
          message: "Purchase tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Success",
      data: purchase,
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