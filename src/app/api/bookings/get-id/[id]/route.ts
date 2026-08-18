import pool from "@/lib/db";
import { responseError, serializeBigInt } from "@/lib/helper";
import { getBookingById } from "@/lib/querry/booking.query";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  let client;

  try {
    const { id } = await params;

    // ==========================
    // VALIDATION
    // ==========================

    if (!id) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Booking ID is required",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // CONNECT DB
    // ==========================

    client = await pool.connect();

    // ==========================
    // GET BOOKING
    // ==========================

    const booking = await getBookingById(
      client,
      id
    );

    // ==========================
    // NOT FOUND
    // ==========================

    if (!booking) {
      return NextResponse.json(
        {
          status: false,
          code: 404,
          message: "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================
    // FORMAT
    // ==========================

    const data = serializeBigInt(booking);

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data,
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