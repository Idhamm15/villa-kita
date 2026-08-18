import { PoolClient } from "pg";

export async function getDashboardStatistics(
  client: PoolClient
) {
  const result = await client.query(`
    WITH stats AS (

      SELECT
        -- ==========================
        -- BOOKING
        -- ==========================

        (
          SELECT COUNT(*)::int
          FROM "Booking"
        ) AS total_booking,

        (
          SELECT COUNT(*)::int
          FROM "Booking"
          WHERE "createdAt" < DATE_TRUNC(
            'month',
            CURRENT_DATE
          )
        ) AS previous_booking,

        -- ==========================
        -- OWNER
        -- ==========================

        (
          SELECT COUNT(*)::int
          FROM "User"
          WHERE "role" = 'OWNER'
        ) AS total_owner,

        (
          SELECT COUNT(*)::int
          FROM "User"
          WHERE
            "role" = 'OWNER'
            AND "createdAt" < DATE_TRUNC(
              'month',
              CURRENT_DATE
            )
        ) AS previous_owner,

        -- ==========================
        -- PROPERTY
        -- ==========================

        (
          SELECT COUNT(*)::int
          FROM "Product"
        ) AS total_property,

        (
          SELECT COUNT(*)::int
          FROM "Product"
          WHERE "createdAt" < DATE_TRUNC(
            'month',
            CURRENT_DATE
          )
        ) AS previous_property,

        -- ==========================
        -- REVENUE
        -- ==========================

        (
          SELECT COALESCE(
            SUM("totalPrice"),
            0
          )
          FROM "Booking"
          WHERE "paymentStatus" = 'PAID'
        ) AS total_revenue,

        (
          SELECT COALESCE(
            SUM("totalPrice"),
            0
          )
          FROM "Booking"
          WHERE
            "paymentStatus" = 'PAID'
            AND "createdAt" < DATE_TRUNC(
              'month',
              CURRENT_DATE
            )
        ) AS previous_revenue
    )

    SELECT *
    FROM stats
  `);

  return result.rows[0];
}

export function calculatePercentage(
  current: number,
  previous: number
) {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    return 100;
  }

  return Number(
    (((current - previous) / previous) * 100).toFixed(2)
  );
}