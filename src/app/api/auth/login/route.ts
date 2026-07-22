import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Email dan password wajib diisi",
          data: null,
        },
        { status: 400 }
      );
    }

    // Cari user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          code: 401,
          message: "Email atau password salah",
          data: null,
        },
        { status: 401 }
      );
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          status: false,
          code: 401,
          message: "Email atau password salah",
          data: null,
        },
        { status: 401 }
      );
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    // Generate Refresh Token
    const refreshToken = crypto.randomUUID();

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    // Simpan refresh token
    await prisma.userToken.create({
      data: {
        userId: user.id,
        refreshToken,
        expiredAt,
      },
    });

    // Hilangkan password
    const { password: _, ...userData } = user;

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Login berhasil",
      data: {
        user: userData,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}

