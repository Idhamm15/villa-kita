import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteImage, isImage, saveImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Blog tidak ditemukan.",
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
        ...blog,
        thumbnail: fileUrl(blog.thumbnail),
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
          code: 400,
          message: "Semua field wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Blog tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    // cek slug digunakan blog lain
    const existSlug = await prisma.blog.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (existSlug) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Slug sudah digunakan.",
        },
        {
          status: 400,
        }
      );
    }

    let thumbnailPath = blog.thumbnail;

    // upload thumbnail baru
    if (thumbnail && thumbnail.size > 0) {
      if (!isImage(thumbnail)) {
        return NextResponse.json(
          {
            status: false,
            code: 400,
            message: "Thumbnail harus berupa gambar.",
          },
          {
            status: 400,
          }
        );
      }

      // hapus thumbnail lama
      if (blog.thumbnail) {
        await deleteImage(blog.thumbnail);
      }

      thumbnailPath = await saveImage(
        thumbnail,
        "blogs"
      );
    }

    const updated = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        content,
        isPublished,
        thumbnail: thumbnailPath,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Blog berhasil diupdate.",
      data: {
        ...updated,
        thumbnail: fileUrl(updated.thumbnail),
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Blog tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    // hapus thumbnail
    if (blog.thumbnail) {
      await deleteImage(blog.thumbnail);
    }

    await prisma.blog.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Blog berhasil dihapus.",
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