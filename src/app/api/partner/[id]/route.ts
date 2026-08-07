import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteImage, imageUrl, isImage, saveImage } from "@/lib/upload";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
/**
 * GET Detail Partner
 */
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const partner = await prisma.partner.findUnique({
      where: {
        id,
      },
    });

    if (!partner) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Partner tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        code: 200,
        message: "Success",
        data: {
          ...partner,
          image: imageUrl(partner.image),
        },
      },
      { status: 200 }
    );
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

/**
 * UPDATE Partner
 */
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const form = await req.formData();

    const name = form.get("name") as string;
    const sort = Number(form.get("sort") ?? 0);
    const status = (form.get("status") ?? "true") === "true";

    const image = form.get("image") as File;

    const partner = await prisma.partner.findUnique({
      where: {
        id,
      },
    });

    if (!partner) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Partner tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    let imagePath = partner.image;

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

      // hapus gambar lama
      if (partner.image) {
        await deleteImage(partner.image);
      }
    }

    const updated = await prisma.partner.update({
      where: {
        id,
      },
      data: {
        name,
        image: imagePath,
        sort,
        status,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Partner berhasil diperbarui.",
      data: {
        ...updated,
        image: imageUrl(updated.image),
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

/**
 * DELETE Partner
 */
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const partner = await prisma.partner.findUnique({
      where: {
        id,
      },
    });

    if (!partner) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Partner tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    // hapus file gambar
    if (partner.image) {
      await deleteImage(partner.image);
    }

    // hapus data database
    await prisma.partner.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Partner berhasil dihapus.",
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