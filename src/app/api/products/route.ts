import { NextRequest, NextResponse } from "next/server";
import { Prisma, TypeBooking, TypeProperty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isImage, saveImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseError, serializeBigInt } from "@/lib/helper";
import { authorizeAdminOwner } from "@/lib/auth";

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
          owner: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
          images: true,
          items: {
            orderBy: {
              sort: "asc",
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

    const data = products.map((product) => ({
      ...product,

      priceStart: product.priceStart.toString(),
      price: product.price.toString(),
      thumbnail: fileUrl(product.thumbnail),

      images: product.images.map((image) => ({
        ...image,
        image: image.image ? fileUrl(image.image) : null,
      })),

    }));

    return NextResponse.json(
      serializeBigInt({
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
      })
    );

  } catch (error) {
    console.error(error);

    return responseError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    
    const user = await authorizeAdminOwner(req);
    
    const authorization = req.headers.get("authorization");
    console.log("Authorization:", authorization);
    
    // jika perlu, user bisa dipakai
    console.log(user.id);
    const userId = user.id;
    const form = await req.formData();

    // ==========================
    // GET FORM DATA
    // ==========================

    const categoryId = form.get("categoryId") as string;
    const ownerId = form.get("ownerId") as string;

    const thumbnail = form.get("thumbnail") as File | null;
    const name = form.get("name") as string;
    const slug = form.get("slug") as string;

    const location = form.get("location") as string;
    const address = form.get("address") as string;
    const urlMaps = form.get("urlMaps") as string;

    const description = form.get("description") as string;

    const totalBedroom = Number(form.get("totalBedroom") ?? 0);
    const totalBathroom = Number(form.get("totalBathroom") ?? 0);
    const maxGuest = Number(form.get("maxGuest") ?? 0);
    const wide = Number(form.get("wide") ?? 0);

    // const priceStart = BigInt(form.get("priceStart") as string);
    // const price = BigInt(form.get("price") as string);

    const stock = Number(form.get("stock") ?? 1);
    const capacity = Number(form.get("capacity") ?? 1);

    const typeUnit = form.get("typeUnit") as string;

    const isActive = (form.get("isActive") ?? "true") === "true";

    // Enum Array
    const typeProperty = form
      .getAll("typeProperty")
      .map((value) => value.toString().trim())
      .filter(Boolean) as TypeProperty[];

    const typeBooking = form
      .getAll("typeBooking")
      .map((value) => value.toString().trim())
      .filter(Boolean) as TypeBooking[];

    // Images
    const images = form.getAll("images") as File[];

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !categoryId ||
      !ownerId ||
      !name ||
      !slug ||
      !address ||
      !urlMaps ||
      !description
    ) {
      return NextResponse.json(
        {
          status: false,
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
          message: "Kategori tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // cek owner
    const owner = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      return NextResponse.json(
        {
          status: false,
          message: "Owner tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const priceStartValue = form.get("priceStart");
    const priceValue = form.get("price");

    if (!priceStartValue || !priceValue) {
      return NextResponse.json(
        {
          status: false,
          message: "Harga wajib diisi.",
        },
        { status: 400 }
      );
    }

    const priceStart = BigInt(priceStartValue.toString());
    const price = BigInt(priceValue.toString());

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
          message: "Slug sudah digunakan.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // UPLOAD IMAGES
    // ==========================

    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      imagePaths.push(await saveImage(image, "products"));
    }

    let thumbnailPath = "";

    if (thumbnail && thumbnail.size > 0) {
      if (!isImage(thumbnail)) {
        return NextResponse.json(
          {
            status: false,
            message: "Thumbnail harus berupa gambar.",
          },
          { status: 400 }
        );
      }

      thumbnailPath = await saveImage(thumbnail, "products");
    } else if (imagePaths.length > 0) {
      thumbnailPath = imagePaths[0];
    }

    if (!thumbnailPath) {
      return NextResponse.json(
        {
          status: false,
          message: "Thumbnail wajib diisi.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // TRANSACTION
    // ==========================

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          categoryId,
          ownerId,
          createdBy: userId,

          name,
          slug,

          location,
          address,
          urlMaps,

          description,

          totalBedroom,
          totalBathroom,
          maxGuest,
          wide,

          priceStart,
          price,

          stock,
          capacity,

          typeUnit,

          isActive,
          thumbnail: thumbnailPath,

          typeProperty,
          typeBooking,
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

      return tx.product.findUnique({
        where: {
          id: product.id,
        },
        include: {
          category: true,
          owner: true,
          user: true,
          images: true,
          items: true,
        },
      });
    });

    if (!result) {
      return responseError(new Error("Gagal membuat produk."));
    }

    const responseData = {
      ...result,
      thumbnail: fileUrl(result.thumbnail),
      images: result.images.map((image) => ({
        ...image,
        image: image.image ? fileUrl(image.image) : null,
      })),
    };

    return NextResponse.json(
      serializeBigInt(
      {
        status: true,
        message: "Produk berhasil dibuat.",
        data: responseData,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return responseError(error);
  }
}