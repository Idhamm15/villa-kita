import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { responseError } from "@/lib/helper";
import { calculatePercentage, getDashboardStatistics } from "@/lib/querry/statistics.query";

export async function GET() {
  let client;

  try {
    client = await pool.connect();

    const stats =
      await getDashboardStatistics(client);

    const totalBooking = Number(
      stats.total_booking ?? 0
    );

    const previousBooking = Number(
      stats.previous_booking ?? 0
    );

    const totalOwner = Number(
      stats.total_owner ?? 0
    );

    const previousOwner = Number(
      stats.previous_owner ?? 0
    );

    const totalProperty = Number(
      stats.total_property ?? 0
    );

    const previousProperty = Number(
      stats.previous_property ?? 0
    );

    const totalRevenue = Number(
      stats.total_revenue ?? 0
    );

    const previousRevenue = Number(
      stats.previous_revenue ?? 0
    );

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",

      data: {
        totalBooking: {
          value: totalBooking,
          percentage: calculatePercentage(
            totalBooking,
            previousBooking
          ),
        },

        totalOwner: {
          value: totalOwner,
          percentage: calculatePercentage(
            totalOwner,
            previousOwner
          ),
        },

        totalProperty: {
          value: totalProperty,
          percentage: calculatePercentage(
            totalProperty,
            previousProperty
          ),
        },

        totalRevenue: {
          value: totalRevenue,
          percentage: calculatePercentage(
            totalRevenue,
            previousRevenue
          ),
        },
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