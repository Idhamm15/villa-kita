import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const voucher = await prisma.voucher.findUnique({
        where: {
        code: code.toUpperCase(),
        },
    });

    if (!voucher) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Voucher tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        code: 200,
        message: "Success",
        data: {
          ...voucher,
          discount: Number(voucher.discount),
          minPurchase: Number(voucher.minPurchase),
        },
      },
      {
        status: 200,
      }
    );
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