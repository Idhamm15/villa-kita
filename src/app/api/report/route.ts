import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus, Prisma } from "@prisma/client";
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

    // ==========================
    // WHERE
    // ==========================

    const conditions: Prisma.Sql[] = [];

    if (startDate) {
      conditions.push(
        Prisma.sql`b."createdAt" >= ${new Date(startDate)}`
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      conditions.push(
        Prisma.sql`b."createdAt" <= ${end}`
      );
    }

    if (paymentStatus) {
      conditions.push(
        Prisma.sql`b."paymentStatus" = ${paymentStatus}`
      );
    }

    const whereSql =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.empty;

    // ==========================
    // DATA
    // ==========================

    const bookings = await prisma.$queryRaw<
      {
        tanggal: Date;
        invoice: string;
        properti: string;
        kategori: string;
        nominal: bigint;
        status: PaymentStatus;
      }[]
    >`
      SELECT
        COALESCE(b."paidAt", b."createdAt") AS tanggal,
        b."bookingCode" AS invoice,
        p."name" AS properti,
        p."typeProperty" AS kategori,
        b."totalPrice" AS nominal,
        b."paymentStatus" AS status

      FROM "Booking" b

      INNER JOIN "Product" p
        ON p.id = b."productId"

      ${whereSql}

      ORDER BY b."createdAt" DESC

      LIMIT ${limit}
      OFFSET ${skip}
    `;

    // ==========================
    // TOTAL
    // ==========================

    const totalResult = await prisma.$queryRaw<
      { total: bigint }[]
    >`
      SELECT COUNT(*) AS total

      FROM "Booking" b

      INNER JOIN "Product" p
        ON p.id = b."productId"

      ${whereSql}
    `;

    const total = Number(totalResult[0]?.total ?? 0);

    // ==========================
    // RESPONSE
    // ==========================

    const data = bookings.map((item) => ({
      tanggal: item.tanggal,
      invoice: item.invoice,
      properti: item.properti,
      kategori: item.kategori,
      nominal: Number(item.nominal),
      status: item.status,
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