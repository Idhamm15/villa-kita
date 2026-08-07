import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isImage, saveImage } from "@/lib/upload";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const skip = (page - 1) * limit;

    const baseUrl =
      process.env.NEXT_APP_URL || process.env.APP_URL || "";

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.partner.count(),
    ]);

    const data = partners.map((partner) => ({
      ...partner,
      image: partner.image
        ? `${baseUrl}${partner.image}`
        : null,
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
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const sort = Number(form.get("sort") ?? 0);
    const status = (form.get("status") ?? "true") === "true";

    const image = form.get("image") as File;

    if (!name) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Nama wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const exist = await prisma.partner.findFirst({
      where: {
        name,
      },
    });

    if (exist) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Partner sudah ada.",
        },
        {
          status: 400,
        }
      );
    }

    let imagePath = "";

    if (image && image.size > 0) {
      if (!isImage(image)) {
        return NextResponse.json(
          {
            status: false,
            code: 400,
            message: "File harus berupa gambar.",
          },
          {
            status: 400,
          }
        );
      }

      imagePath = await saveImage(image, "partners");
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        image: imagePath,
        sort,
        status,
      },
    });

    return NextResponse.json(
      {
        status: true,
        code: 201,
        message: "Partner berhasil dibuat.",
        data: partner,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}