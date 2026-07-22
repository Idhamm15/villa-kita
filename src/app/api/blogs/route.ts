import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage, isImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";
    const isPublished = searchParams.get("isPublished");

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (isPublished !== null) {
      where.isPublished = isPublished === "true";
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.blog.count({
        where,
      }),
    ]);

    const data = blogs.map((blog) => ({
      ...blog,
      thumbnail: fileUrl(blog.thumbnail),
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
        totalPage: Math.ceil(total / limit),
      },
    });
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

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const title = form.get("title") as string;
    const slug = form.get("slug") as string;
    const content = form.get("content") as string;
    const isPublished =
      (form.get("isPublished") ?? "true") === "true";

    const thumbnail = form.get("thumbnail") as File;

    if (!title || !slug || !content) {
      return NextResponse.json(
        {
          status: false,
          message: "Semua field wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const exist = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (exist) {
      return NextResponse.json(
        {
          status: false,
          message: "Slug sudah digunakan.",
        },
        {
          status: 400,
        }
      );
    }

    let thumbnailPath = "";

    if (thumbnail && thumbnail.size > 0) {
      if (!isImage(thumbnail)) {
        return NextResponse.json(
          {
            status: false,
            message: "Thumbnail harus berupa gambar.",
          },
          {
            status: 400,
          }
        );
      }

      thumbnailPath = await saveImage(
        thumbnail,
        "blogs"
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        thumbnail: thumbnailPath,
        isPublished,
      },
    });

    return NextResponse.json(
      {
        status: true,
        code: 201,
        message: "Blog berhasil dibuat.",
        data: {
          ...blog,
          thumbnail: fileUrl(blog.thumbnail),
        },
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
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}