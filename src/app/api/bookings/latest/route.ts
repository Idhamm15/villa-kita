import { NextResponse } from "next/server";
import pool from "@/lib/db";
import {
  responseError,
  serializeBigInt,
} from "@/lib/helper";
import { getLatestBookings } from "@/lib/querry/booking.query";

export async function GET() {
  let client;

  try {
    client = await pool.connect();

    const bookings = await getLatestBookings(
      client,
      5
    );

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data: serializeBigInt(bookings),
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