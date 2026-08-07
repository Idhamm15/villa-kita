import { NextRequest, NextResponse } from "next/server";
import { authorizeUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await authorizeUser(req);

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
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
      data: user,
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

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await authorizeUser(req);

    const body = await req.json();

    const {
      username,
      fullname,
      email,
      phone,
      nameBank,
      noBank,
      avatar,
      address,
      password,
    } = body;

    const duplicate = await prisma.user.findFirst({
      where: {
        NOT: {
          id: currentUser.id,
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
      phone,
      nameBank,
      noBank,
      avatar,
      address,
    };

    // Update password jika diisi
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
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
      message: "Profile berhasil diperbarui.",
      data: user,
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