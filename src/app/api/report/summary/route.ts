import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { authorizeAdminOwner } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await authorizeAdminOwner(req);

    const [totalTransaction, revenue] = await Promise.all([
      prisma.booking.count({
        where: {
          paymentStatus: PaymentStatus.PAID,
        },
      }),

      prisma.booking.aggregate({
        where: {
          paymentStatus: PaymentStatus.PAID,
        },
        _sum: {
          totalPrice: true,
        },
      }),
    ]);

    const totalRevenue = Number(revenue._sum.totalPrice ?? 0);
    const totalExpenses = 0;
    const totalProfit = totalRevenue - totalExpenses;

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data: {
        totalTransaction,
        totalRevenue,
        totalExpenses,
        totalProfit,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        code: 500,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}