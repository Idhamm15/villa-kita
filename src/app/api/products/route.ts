import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isImage, saveImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const search = searchParams.get("search") ?? "";
    const categoryId = searchParams.get("categoryId") ?? "";
    const location = searchParams.get("location") ?? "";
    const isActive = searchParams.get("isActive");

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        {
          name: {
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

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (isActive !== null) {
      where.isActive = isActive === "true";
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,

        include: {
          category: true,
          images: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    // Transform URL gambar
    const data = products.map((product) => ({
      ...product,

      thumbnail: fileUrl(product.thumbnail),

      images: product.images.map((image) => ({
        ...image,
        image: fileUrl(image.image),
      })),
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

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const userId = payload.id;

    const categoryId = form.get("categoryId") as string;
    const name = form.get("name") as string;
    const slug = form.get("slug") as string;
    const description = form.get("description") as string;
    const price = form.get("price") as string;
    const location = form.get("location") as string;
    const stock = Number(form.get("stock") ?? 1);
    const isActive = (form.get("isActive") ?? "true") === "true";

    const thumbnail = form.get("thumbnail") as File;
    const images = form.getAll("images") as File[];

    // ==========================
    // VALIDASI
    // ==========================

    if (!categoryId || !name || !slug || !description || !price) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // cek kategori
    const category = await prisma.categoryProduct.findUnique({
      where: {
        id: categoryId,
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

    // cek slug
    const existSlug = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (existSlug) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Slug sudah digunakan.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // UPLOAD THUMBNAIL
    // ==========================

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

      thumbnailPath = await saveImage(thumbnail, "products");
    }

    // ==========================
    // UPLOAD IMAGES
    // ==========================

    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      const path = await saveImage(image, "products");

      imagePaths.push(path);
    }

    // ==========================
    // TRANSACTION
    // ==========================

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          categoryId,
          createdBy: userId,
          name,
          slug,
          description,
          thumbnail: thumbnailPath,
          price: new Prisma.Decimal(price),
          location,
          stock,
          isActive,
        },
      });

      if (imagePaths.length > 0) {
        await tx.productImage.createMany({
          data: imagePaths.map((image) => ({
            productId: product.id,
            image,
          })),
        });
      }

      return await tx.product.findUnique({
        where: {
          id: product.id,
        },
        include: {
          category: true,
          images: true,
        },
      });
    });

    return NextResponse.json(
      {
        status: true,
        code: 201,
        message: "Produk berhasil dibuat.",
        data: result,
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