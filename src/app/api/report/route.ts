import { NextRequest, NextResponse } from "next/server";
import {
  PaymentStatus,
  TypeBooking,
  TypeProperty,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { authorizeAdminOwner } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await authorizeAdminOwner(req);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const skip = (page - 1) * limit;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const paymentStatus = searchParams.get("paymentStatus") as PaymentStatus | null;
    const typeProperty = searchParams.get("typeProperty") as TypeProperty | null;
    const typeBooking = searchParams.get("typeBooking") as TypeBooking | null;

    const where: any = {};

    // filter periode
    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    if (typeProperty || typeBooking) {
      where.product = {};

      if (typeProperty) {
        where.product.typeProperty = {
          has: typeProperty,
        };
      }

      if (typeBooking) {
        where.product.typeBooking = {
          has: typeBooking,
        };
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: {
            select: {
              name: true,
              typeProperty: true,
              typeBooking: true,
            },
          },
        },
      }),

      prisma.booking.count({
        where,
      }),
    ]);

    const data = bookings.map((item) => ({
      tanggal: item.paidAt ?? item.createdAt,
      invoice: item.bookingCode,
      properti: item.product.name,
      kategori: item.product.typeProperty,
      deskripsi: `${item.product.typeBooking.join(", ")} (${item.checkIn.toISOString().split("T")[0]} - ${item.checkOut.toISOString().split("T")[0]})`,
      nominal: Number(item.totalPrice),
      status: item.paymentStatus,
    }));

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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