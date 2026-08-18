import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage, isImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import { getPagination } from "@/lib/pagination";
import pool from "@/lib/db";
import { buildBlogFilter, getBlogs } from "@/lib/querry/blog.query";
import { responseError } from "@/lib/helper";

export async function GET(req: NextRequest) {
  let client;

  try {
    const { searchParams } = new URL(req.url);

    // ==========================
    // PAGINATION
    // ==========================

    const {
      page,
      limit,
      offset,
    } = getPagination(req);

    // ==========================
    // FILTER
    // ==========================

    const filter = {
      search:
        searchParams.get("search")?.trim() ?? "",

      isPublished:
        searchParams.get("isPublished"),
    };

    // ==========================
    // CONNECT DB
    // ==========================

    client = await pool.connect();

    // ==========================
    // BUILD FILTER
    // ==========================

    const {
      whereSql,
      params,
      nextParamIndex,
    } = buildBlogFilter(filter);

    // ==========================
    // GET BLOGS
    // ==========================

    const {
      blogs,
      total,
    } = await getBlogs(
      client,
      whereSql,
      params,
      limit,
      offset,
      nextParamIndex
    );

    // ==========================
    // FORMAT
    // ==========================

    const data = blogs.map((blog) => ({
      ...blog,

      thumbnail: blog.thumbnail
        ? fileUrl(blog.thumbnail)
        : null,
    }));

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",

      data,

      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(
          total / limit
        ),
      },
    });
  } catch (error) {
    console.error(error);

    return responseError(error);
  } finally {
    if (client) {
      client.release();
    }
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