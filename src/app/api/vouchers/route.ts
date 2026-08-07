import { authorizeAdminOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          code: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [vouchers, total] = await Promise.all([
      prisma.voucher.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.voucher.count({
        where,
      }),
    ]);

    // Convert semua BigInt menjadi Number
    const data = JSON.parse(
      JSON.stringify(vouchers, (_, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

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

export async function POST(req: NextRequest) {
  try {

    const user = await authorizeAdminOwner(req);

    const authorization = req.headers.get("authorization");
    console.log("Authorization:", authorization);

    // jika perlu, user bisa dipakai
    console.log(user.id);

    const body = await req.json();

    const {
      code,
      description,
      discount,
      minPurchase,
      dateExpired,
      status,
    } = body;

    if (!code || discount == null || minPurchase == null || !dateExpired) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message:
            "Code, discount, minPurchase, dan dateExpired wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // CEK DUPLIKAT
    // ==========================
    const exist = await prisma.voucher.findUnique({
      where: {
        code,
      },
    });

    if (exist) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Kode voucher sudah digunakan.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // CREATE
    // ==========================
    const voucher = await prisma.voucher.create({
      data: {
        code,
        description,
        discount: BigInt(discount),
        minPurchase: BigInt(minPurchase),
        dateExpired: new Date(dateExpired),
        status: status ?? true,
      },
    });

    return NextResponse.json(
      {
        status: true,
        code: 201,
        message: "Voucher berhasil dibuat.",
        data: {
          ...voucher,
          discount: Number(voucher.discount),
          minPurchase: Number(voucher.minPurchase),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      switch (error.message) {
        case "UNAUTHORIZED":
          return NextResponse.json(
            {
              status: false,
              code: 401,
              message: "Unauthorized",
            },
            {
              status: 401,
            }
          );

        case "USER_NOT_FOUND":
          return NextResponse.json(
            {
              status: false,
              code: 401,
              message: "User tidak ditemukan.",
            },
            {
              status: 401,
            }
          );

        case "FORBIDDEN":
          return NextResponse.json(
            {
              status: false,
              code: 403,
              message: "Hanya ADMIN dan OWNER yang dapat mengakses.",
            },
            {
              status: 403,
            }
          );

        case "INVALID_TOKEN":
          return NextResponse.json(
            {
              status: false,
              code: 401,
              message: "Token tidak valid.",
            },
            {
              status: 401,
            }
          );
      }
    }

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