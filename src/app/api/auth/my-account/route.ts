import { NextRequest, NextResponse } from "next/server";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isImage, saveImage } from "@/lib/upload";
import { responseError, serializeBigInt } from "@/lib/helper";
import { fileUrl } from "@/lib/url";

export async function GET(req: NextRequest) {
  try {
    const user = await authorizeUser(req);

    const data = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      nameBank: user.nameBank,
      noBank: user.noBank,
      avatar: user.avatar ? fileUrl(user.avatar) : null,
      isActive: user.isActive,
      registerAt: user.registerAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      serializeBigInt({
        status: true,
        code: 200,
        message: "Success",
        data,
      })
    );
  } catch (error) {
    const response = responseAuth(error);

    if (response) return response;

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

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await authorizeUser(req);

    const formData = await req.formData();

    const fullname = formData.get("fullname")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";

    const avatar = formData.get("avatar") as File | null;

    if (!fullname || !username || !email) {
      return NextResponse.json(
        {
          status: false,
          message: "Semua field wajib diisi.",
        },
        {
          status: 422,
        }
      );
    }

    let avatarPath = currentUser.avatar;

    if (avatar && avatar.size > 0) {
    if (!isImage(avatar)) {
        return NextResponse.json(
        {
            status: false,
            message: "Avatar harus berupa gambar.",
        },
        {
            status: 400,
        }
        );
    }

    avatarPath = await saveImage(avatar, "avatars");
    }


    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (emailExists) {
      return NextResponse.json(
        {
          status: false,
          message: "Email sudah digunakan.",
        },
        {
          status: 422,
        }
      );
    }

    const usernameExists = await prisma.user.findFirst({
      where: {
        username,
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        {
          status: false,
          message: "Username sudah digunakan.",
        },
        {
          status: 422,
        }
      );
    }

    const user = await prisma.user.update({
    where: {
        id: currentUser.id,
    },
    data: {
        fullname,
        username,
        email,
        avatar: fileUrl(avatarPath),
    },
    });
    return NextResponse.json({
      status: true,
      message: "Profil berhasil diperbarui.",
      data: user,
    });
  } catch (error) {
    const response = responseAuth(error);

    if (response) return response;

    console.error(error);

    return responseError(error);
  }
}