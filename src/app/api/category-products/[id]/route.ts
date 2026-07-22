import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.categoryProduct.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          status: false,
          message: "Kategori tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Name dan slug wajib diisi.",
        },
        { status: 400 }
      );
    }

    // Cek apakah kategori ada
    const existingCategory = await prisma.categoryProduct.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Kategori tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // Cek slug digunakan kategori lain
    const existingSlug = await prisma.categoryProduct.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Slug sudah digunakan.",
        },
        { status: 400 }
      );
    }

    const category = await prisma.categoryProduct.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Kategori berhasil diupdate.",
      data: category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.categoryProduct.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Kategori tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // Jangan hapus jika masih memiliki produk
    if (category._count.products > 0) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Kategori tidak dapat dihapus karena masih memiliki produk.",
        },
        { status: 400 }
      );
    }

    await prisma.categoryProduct.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Kategori berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}