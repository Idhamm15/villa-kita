import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { saveImage, deleteImage, isImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      images: true,
    },
  });

  if (!product) {
    return NextResponse.json(
      {
        status: false,
        message: "Produk tidak ditemukan",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    status: true,
    data: {
      ...product,
      thumbnail: fileUrl(product.thumbnail),
      images: product.images.map((item) => ({
        ...item,
        image: fileUrl(item.image),
      })),
    },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const form = await req.formData();

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

    const oldProduct = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!oldProduct) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    let thumbnailPath = oldProduct.thumbnail;

    if (thumbnail && thumbnail.size > 0) {
      if (!isImage(thumbnail)) {
        return NextResponse.json(
          {
            status: false,
            message: "Thumbnail harus berupa gambar",
          },
          {
            status: 400,
          }
        );
      }

      if (oldProduct.thumbnail) {
        await deleteImage(oldProduct.thumbnail);
      }

      thumbnailPath = await saveImage(thumbnail, "products");
    }

    const newImages: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      newImages.push(await saveImage(image, "products"));
    }

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: {
          id,
        },
        data: {
          categoryId,
          name,
          slug,
          description,
          thumbnail: thumbnailPath,
          location,
          stock,
          isActive,
          price: new Prisma.Decimal(price),
        },
      });

      if (newImages.length > 0) {
        await tx.productImage.createMany({
          data: newImages.map((item) => ({
            productId: id,
            image: item,
          })),
        });
      }

      return await tx.product.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          images: true,
        },
      });
    });

    return NextResponse.json({
      status: true,
      message: "Produk berhasil diupdate",
      data: {
        ...result,
        thumbnail: fileUrl(result?.thumbnail),
        images:
          result?.images.map((item) => ({
            ...item,
            image: fileUrl(item.image),
          })) ?? [],
      },
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
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    // Hapus thumbnail
    if (product.thumbnail) {
      await deleteImage(product.thumbnail);
    }

    // Hapus semua gambar
    for (const image of product.images) {
      await deleteImage(image.image);
    }

    await prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      await tx.product.delete({
        where: {
          id,
        },
      });
    });

    return NextResponse.json({
      status: true,
      message: "Produk berhasil dihapus",
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