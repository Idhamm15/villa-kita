import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await authorizeUser(req);

    const purchases = await prisma.booking.findMany({
      where: {
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
      },
      orderBy: {
        paidAt: "desc",
      },
    });

    return NextResponse.json({
      status: true,
      message: "Success",
      data: purchases,
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