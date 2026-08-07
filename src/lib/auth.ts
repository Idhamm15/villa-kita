import { prisma } from "@/lib/prisma";
import { Role, User } from "@prisma/client";
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

type TokenPayload = JwtPayload & {
  id: string;
};

async function getCurrentUser(req: NextRequest): Promise<User> {
  const authorization = req.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const token = authorization.slice(7).trim();

  let payload: TokenPayload;

  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error("TOKEN_EXPIRED");
    }

    if (error instanceof JsonWebTokenError) {
      throw new Error("INVALID_TOKEN");
    }

    throw error;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}

/**
 * Semua user yang sudah login
 */
export async function authorizeUser(req: NextRequest) {
  return await getCurrentUser(req);
}

/**
 * Hanya ADMIN dan OWNER
 */
export async function authorizeAdminOwner(req: NextRequest) {
  const user = await getCurrentUser(req);

    if (user.role !== Role.ADMIN && user.role !== Role.OWNER) {
    throw new Error("FORBIDDEN");
    }

  return user;
}

export function responseAuth(error: unknown) {
  if (!(error instanceof Error)) {
    return null;
  }

  switch (error.message) {
    case "TOKEN_EXPIRED":
      return NextResponse.json(
        {
          status: false,
          message: "Token telah kedaluwarsa.",
        },
        {
          status: 401,
        }
      );

    case "INVALID_TOKEN":
    case "UNAUTHORIZED":
      return NextResponse.json(
        {
          status: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    case "USER_NOT_FOUND":
      return NextResponse.json(
        {
          status: false,
          message: "User tidak ditemukan.",
        },
        {
          status: 404,
        }
      );

    default:
      return null;
  }
}