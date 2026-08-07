import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeAdminOwner } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    await authorizeAdminOwner(req);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          fullname: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          username: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
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
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

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
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await authorizeAdminOwner(req);

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

    if (!username || !fullname || !email || !password) {
      return NextResponse.json(
        {
          status: false,
          message: "Username, fullname, email dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const exist = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (exist) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        role,
        phone,
        nameBank,
        noBank,
        avatar,
        address,
        isActive,
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
      },
    });

    return NextResponse.json(
      {
        status: true,
        message: "User berhasil dibuat.",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}