import { authorizeAdminOwner } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        message: "User tidak ditemukan.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    status: true,
    data: user,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const duplicate = await prisma.user.findFirst({
    where: {
      NOT: {
        id,
      },
      OR: [{ username }, { email }],
    },
  });

  if (duplicate) {
    return NextResponse.json(
      {
        status: false,
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

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return NextResponse.json({
    status: true,
    message: "User berhasil diperbarui.",
    data: user,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  return NextResponse.json({
    status: true,
    message: "User berhasil dihapus.",
  });
}