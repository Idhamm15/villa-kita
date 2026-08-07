import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeAdminOwner } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET Detail Voucher
 */
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Kode voucher wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const voucher = await prisma.voucher.findFirst({
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

/**
 * UPDATE Voucher
 */
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {

    const user = await authorizeAdminOwner(req);

    const authorization = req.headers.get("authorization");
    console.log("Authorization:", authorization);

    // jika perlu, user bisa dipakai
    console.log(user.id);
    
    const { id } = await params;

    const body = await req.json();

    const {
      code,
      description,
      discount,
      minPurchase,
      dateExpired,
      status,
    } = body;

    const voucher = await prisma.voucher.findUnique({
      where: {
        id,
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

    const duplicate = await prisma.voucher.findFirst({
      where: {
        code,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
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

    const updated = await prisma.voucher.update({
      where: {
        id,
      },
      data: {
        code,
        description,
        discount: BigInt(discount),
        minPurchase: BigInt(minPurchase),
        dateExpired: new Date(dateExpired),
        status,
      },
    });

    return NextResponse.json(
      {
        status: true,
        code: 200,
        message: "Voucher berhasil diperbarui.",
        data: {
          ...updated,
          discount: Number(updated.discount),
          minPurchase: Number(updated.minPurchase),
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

/**
 * DELETE Voucher
 */
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const voucher = await prisma.voucher.findUnique({
      where: {
        id,
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

    await prisma.voucher.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        status: true,
        code: 200,
        message: "Voucher berhasil dihapus.",
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