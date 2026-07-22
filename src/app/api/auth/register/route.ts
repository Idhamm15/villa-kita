import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      username,
      fullname,
      email,
      password,
      phone,
      address,
    } = body;

    if (!username || !fullname || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username, fullname, email dan password wajib diisi",
        },
        { status: 400 }
      );
    }

    // Normalisasi email
    const normalizedEmail = email.trim().toLowerCase();

    // Cek email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah digunakan",
        },
        { status: 400 }
      );
    }

    // Cek username
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username sudah digunakan",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        address,
        role: Role.USER,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Register berhasil",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}