import { NextRequest, NextResponse } from "next/server";
import { Prisma, TypeBooking, TypeProperty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { saveImage, deleteImage, isImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseError, serializeBigInt } from "@/lib/helper";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        owner: true,
        user: true,
        images: true,
        items: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: true,
      data: serializeBigInt(product),
    });
  } catch (error) {
    console.error(error);
    return responseError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    jwt.verify(token, process.env.JWT_SECRET!);

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    const categoryId = form.get("categoryId") as string;
    const ownerId = form.get("ownerId") as string;

    const name = form.get("name") as string;
    const slug = form.get("slug") as string;
    const description = form.get("description") as string;

    const location = form.get("location") as string;
    const address = form.get("address") as string;
    const urlMaps = form.get("urlMaps") as string;

    const totalBedroom = Number(form.get("totalBedroom"));
    const totalBathroom = Number(form.get("totalBathroom"));
    const maxGuest = Number(form.get("maxGuest"));
    const wide = Number(form.get("wide"));

    const priceStart = BigInt(form.get("priceStart") as string);
    const price = BigInt(form.get("price") as string);

    const stock = Number(form.get("stock") ?? 1);
    const capacity = Number(form.get("capacity") ?? 1);

    const typeUnit = form.get("typeUnit") as string;

    const isActive = (form.get("isActive") ?? "true") === "true";

    const typeProperty = form.getAll("typeProperty") as TypeProperty[];
    const typeBooking = form.getAll("typeBooking") as TypeBooking[];

    const images = form.getAll("images") as File[];

    // cek slug
    const slugExist = await prisma.product.findFirst({
      where: {
        slug,
        NOT: {
          id: id,
        },
      },
    });

    if (slugExist) {
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

    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      imagePaths.push(await saveImage(image, "products"));
    }

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: {
          id: id,
        },
        data: {
          categoryId,
          ownerId,

          name,
          slug,
          description,

          location,
          address,
          urlMaps,

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

          typeProperty,
          typeBooking,
        },
      });

      if (imagePaths.length > 0) {
        await tx.productImage.deleteMany({
          where: {
            productId: updated.id,
          },
        });

        await tx.productImage.createMany({
          data: imagePaths.map((image) => ({
            productId: updated.id,
            image,
          })),
        });
      }

      return tx.product.findUnique({
        where: {
          id: updated.id,
        },
        include: {
          category: true,
          owner: true,
          user: true,
          images: true,
          items: true,
          attachments: true,
        },
      });
    });

    return NextResponse.json({
      status: true,
      message: "Produk berhasil diperbarui.",
      data: result,
    });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get("token")?.value;
    const { id } = await params;
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

    jwt.verify(token, process.env.JWT_SECRET!);

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Produk berhasil dihapus.",
    });
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