import { NextRequest, NextResponse } from "next/server";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const user = await authorizeUser(req);

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            price: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      status: true,
      message: "Success",
      data: bookings,
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