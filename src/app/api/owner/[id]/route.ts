import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeAdminOwner } from "@/lib/auth";
import bcrypt from "bcryptjs";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET Detail User
 */
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await authorizeAdminOwner(req);

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        role: true,
        phone: true,
        nameBank: true,
        noBank: true,
        avatar: true,
        address: true,
        isActive: true,
        registerAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "User tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data: {
        ...user,
        registerAt: user.registerAt
          .toISOString()
          .split("T")[0],
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


/**
 * UPDATE User
 */
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    await authorizeAdminOwner(req);

    const { id } = await params;

    const body = await req.json();

    const {
      username,
      fullname,
      email,
      password,
      role,
      phone,
      nameBank,
      noBank,
      avatar,
      address,
      isActive,
    } = body;


    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });


    if (!user) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "User tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }


    // cek username/email duplikat
    const duplicate = await prisma.user.findFirst({
      where: {
        NOT: {
          id,
        },
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });


    if (duplicate) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Username atau email sudah digunakan.",
        },
        {
          status: 400,
        }
      );
    }


    const data: any = {
      username,
      fullname,
      email,
      role,
      phone,
      nameBank,
      noBank,
      avatar,
      address,
      isActive,
    };


    // update password jika ada
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }


    const updated = await prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        role: true,
        phone: true,
        nameBank: true,
        noBank: true,
        avatar: true,
        address: true,
        isActive: true,
        registerAt: true,
        updatedAt: true,
      },
    });


    return NextResponse.json({
      status: true,
      code: 200,
      message: "User berhasil diperbarui.",
      data: updated,
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


/**
 * DELETE User
 */
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await authorizeAdminOwner(req);

    const { id } = await params;


    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });


    if (!user) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "User tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }


    await prisma.user.delete({
      where: {
        id,
      },
    });


    return NextResponse.json(
      {
        status: true,
        code: 200,
        message: "User berhasil dihapus.",
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