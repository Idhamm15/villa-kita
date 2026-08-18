import { PoolClient } from "pg";

interface BookingFilter {
  search: string;
  status: string;
}

export function buildBookingFilter(filter: BookingFilter) {
  const conditions: string[] = [];
  const params: any[] = [];

  let paramIndex = 1;

  // ==========================
  // SEARCH
  // ==========================

  if (filter.search) {
    conditions.push(`
      (
        b."bookingCode" ILIKE $${paramIndex}
        OR b."nameGuest" ILIKE $${paramIndex}
        OR u.fullname ILIKE $${paramIndex}
        OR u.email ILIKE $${paramIndex}
        OR p.name ILIKE $${paramIndex}
      )
    `);

    params.push(`%${filter.search}%`);
    paramIndex++;
  }

  // ==========================
  // STATUS
  // ==========================

  if (filter.status) {
    conditions.push(`
      b.status = $${paramIndex}
    `);

    params.push(filter.status);
    paramIndex++;
  }

  return {
    whereSql:
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "",

    params,
    nextParamIndex: paramIndex,
  };
}

export async function getBookings(
  client: PoolClient,
  whereSql: string,
  params: any[],
  limit: number,
  offset: number,
  paramIndex: number
) {
  // ==========================
  // COUNT
  // ==========================

  const countResult = await client.query(
    `
      SELECT COUNT(*)::int AS total
      FROM "Booking" b

      LEFT JOIN "User" u
        ON u.id = b."userId"

      LEFT JOIN "Product" p
        ON p.id = b."productId"

      ${whereSql}
    `,
    params
  );

  const total = countResult.rows[0].total;

  // ==========================
  // DATA
  // ==========================

  const bookingParams = [
    ...params,
    limit,
    offset,
  ];

  const bookingsResult = await client.query(
    `
      SELECT
        b.*,

        json_build_object(
          'id', u.id,
          'fullname', u.fullname,
          'email', u.email
        ) AS user,

        json_build_object(
          'id', p.id,
          'name', p.name,
          'slug', p.slug,
          'price', p.price,
          'location', p.location
        ) AS product

      FROM "Booking" b

      LEFT JOIN "User" u
        ON u.id = b."userId"

      LEFT JOIN "Product" p
        ON p.id = b."productId"

      ${whereSql}

      ORDER BY b."createdAt" DESC

      LIMIT $${paramIndex}
      OFFSET $${paramIndex + 1}
    `,
    bookingParams
  );

  return {
    bookings: bookingsResult.rows,
    total,
  };
}

export async function getBookingById(
  client: PoolClient,
  id: string
) {
  const result = await client.query(
    `
      SELECT
        b.*,

        json_build_object(
          'id', u.id,
          'fullname', u.fullname,
          'email', u.email
        ) AS "user",

        json_build_object(
          'id', p.id,
          'name', p.name,
          'slug', p.slug,
          'price', p.price,
          'location', p.location
        ) AS "product"

      FROM "Booking" b

      LEFT JOIN "User" u
        ON u.id = b."userId"

      LEFT JOIN "Product" p
        ON p.id = b."productId"

      WHERE b.id = $1

      LIMIT 1
    `,
    [id]
  );

  const booking = result.rows[0];

  if (!booking) {
    return null;
  }

  const imagesResult = await client.query(
    `
      SELECT *
      FROM "ProductImage"
      WHERE "productId" = $1
    `,
    [booking.productId]
  );

  booking.product = {
    ...booking.product,
    images: imagesResult.rows,
  };

  return booking;
}

export async function getLatestBookings(
  client: PoolClient,
  limit: number = 5
) {
  const result = await client.query(
    `
      SELECT
        b.id,
        b."bookingCode",
        b."nameGuest",
        b."checkIn",
        b."checkOut",
        b."totalGuest",
        b."totalPrice",
        b."status",
        b."paymentStatus",
        b."paymentMethod",
        b."createdAt",

        json_build_object(
          'id', u.id,
          'fullname', u.fullname,
          'email', u.email
        ) AS "user",

        json_build_object(
          'id', p.id,
          'name', p.name,
          'slug', p.slug,
          'price', p.price,
          'location', p.location
        ) AS "product"

      FROM "Booking" b

      LEFT JOIN "User" u
        ON u.id = b."userId"

      LEFT JOIN "Product" p
        ON p.id = b."productId"

      ORDER BY b."createdAt" DESC

      LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}

export interface FetchBooking {
  id: string;

  bookingCode: string;

  nameGuest: string;

  emailGuest?: string | null;

  phoneGuest?: string | null;

  checkIn: string;

  checkOut: string;

  totalGuest: number;

  note?: string | null;

  totalPrice: number;

  status: string;

  paymentMethod?: string | null;

  paymentStatus: string;

  paymentToken?: string | null;

  paymentUrl?: string | null;

  transactionId?: string | null;

  orderId?: string | null;

  paidAt?: string | null;

  expiredAt?: string | null;

  createdAt: string;

  updatedAt: string;

  user?: {
    id: string;
    fullname: string;
    email: string;
  } | null;

  product?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    location: string;
  } | null;
}