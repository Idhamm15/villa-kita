import { NextRequest } from "next/server";

export function getPagination(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(
    Number(searchParams.get("page") ?? 1),
    1
  );

  const limit = Math.max(
    Number(searchParams.get("limit") ?? 10),
    1
  );

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}