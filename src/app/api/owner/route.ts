import pool from "@/lib/db";
import { responseError } from "@/lib/helper";
import { getPagination } from "@/lib/pagination";
import { prisma } from "@/lib/prisma";
import { buildOwnerFilter, getOwners } from "@/lib/querry/owner.query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let client;

  try {
    const { searchParams } = new URL(req.url);

    // ==========================
    // PAGINATION
    // ==========================

    const {
      page,
      limit,
      offset,
    } = getPagination(req);

    // ==========================
    // FILTER
    // ==========================

    const filter = {
      search:
        searchParams.get("search")?.trim() ?? "",
    };

    // ==========================
    // CONNECT DB
    // ==========================

    client = await pool.connect();

    // ==========================
    // BUILD FILTER
    // ==========================

    const {
      whereSql,
      params,
      nextParamIndex,
    } = buildOwnerFilter(filter);

    // ==========================
    // GET OWNERS
    // ==========================

    const {
      owners,
      total,
    } = await getOwners(
      client,
      whereSql,
      params,
      limit,
      offset,
      nextParamIndex
    );

    // ==========================
    // FORMAT
    // ==========================

    const data = owners.map((owner) => ({
      ...owner,

      registerAt: owner.registerAt
        ? new Date(owner.registerAt)
            .toISOString()
            .split("T")[0]
        : null,
    }));

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",

      data,

      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(
          total / limit
        ),
      },
    });
  } catch (error) {
    console.error(error);

    return responseError(error);
  } finally {
    if (client) {
      client.release();
    }
  }
}