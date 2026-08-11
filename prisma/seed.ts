import { Pool } from "pg";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();

  try {
    console.log("Start seeding...");

    await client.query("BEGIN");

    // =====================================================
    // PASSWORD
    // =====================================================

    const password = await bcrypt.hash("password123", 10);

    // =====================================================
    // USERS
    // =====================================================

    const adminId = crypto.randomUUID();
    const ownerId = crypto.randomUUID();
    const userId = crypto.randomUUID();

    // ADMIN
    await client.query(
      `
        INSERT INTO "User" (
          id,
          username,
          fullname,
          email,
          password,
          role,
          phone,
          address,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
        )
        ON CONFLICT (email)
        DO UPDATE SET
          username = EXCLUDED.username,
          fullname = EXCLUDED.fullname,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          "updatedAt" = NOW()
      `,
      [
        adminId,
        "admin",
        "Administrator",
        "admin@villakita.com",
        password,
        "ADMIN",
        "081111111111",
        "Jakarta",
      ]
    );

    // OWNER
    await client.query(
      `
        INSERT INTO "User" (
          id,
          username,
          fullname,
          email,
          password,
          role,
          phone,
          address,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
        )
        ON CONFLICT (email)
        DO UPDATE SET
          username = EXCLUDED.username,
          fullname = EXCLUDED.fullname,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          "updatedAt" = NOW()
      `,
      [
        ownerId,
        "owner",
        "Villa Owner",
        "owner@villakita.com",
        password,
        "OWNER",
        "082222222222",
        "Bandung",
      ]
    );

    // USER
    await client.query(
      `
        INSERT INTO "User" (
          id,
          username,
          fullname,
          email,
          password,
          role,
          phone,
          address,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
        )
        ON CONFLICT (email)
        DO UPDATE SET
          username = EXCLUDED.username,
          fullname = EXCLUDED.fullname,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          "updatedAt" = NOW()
      `,
      [
        userId,
        "user",
        "Regular User",
        "user@villakita.com",
        password,
        "USER",
        "083333333333",
        "Surabaya",
      ]
    );

    // =====================================================
    // PRODUCT
    // =====================================================

    const productId = crypto.randomUUID();

    await client.query(
      `
        INSERT INTO "Product" (
          id,
          "ownerId",
          "createdBy",
          name,
          slug,
          thumbnail,
          description,
          location,
          address,
          "urlMaps",
          "type",
          "booking",
          "totalBedroom",
          "totalBathroom",
          "maxGuest",
          wide,
          "priceStart",
          price,
          "serviceFee",
          "typeUnit",
          stock,
          capacity,
          "isActive",
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19,
          $20,
          $21,
          $22,
          $23,
          NOW(),
          NOW()
        )
        ON CONFLICT (slug)
        DO UPDATE SET
          name = EXCLUDED.name,
          "typeProperty" = EXCLUDED."typeProperty",
          "typeBooking" = EXCLUDED."typeBooking",
          price = EXCLUDED.price,
          "updatedAt" = NOW()
        RETURNING id
      `,
      [
        productId,
        ownerId,
        adminId,
        "Villa Puncak Indah",
        "villa-puncak-indah",
        "/uploads/villa1.jpg",
        "Villa nyaman dengan pemandangan pegunungan.",
        "Puncak",
        "Jl. Raya Puncak No. 1",
        "https://maps.google.com",
        "VILLA",
        "MENGINAP",
        4,
        3,
        10,
        250,
        "1000000",
        "1500000",
        "5000",
        "Entire Villa",
        5,
        10,
        true,
      ]
    );

    // =====================================================
    // PRODUCT IMAGES
    // =====================================================

    await client.query(
      `
        INSERT INTO "ProductImage" (
          id,
          "productId",
          image
        )
        VALUES
          ($1, $2, $3),
          ($4, $2, $5)
      `,
      [
        crypto.randomUUID(),
        productId,
        "/uploads/villa1.jpg",

        crypto.randomUUID(),
        "/uploads/villa2.jpg",
      ]
    );

    // =====================================================
    // PRODUCT ITEMS
    // =====================================================

    const productItems = [
      ["FACILITY", "Private Pool"],
      ["FACILITY", "WiFi"],
      ["FACILITY", "BBQ Area"],
      ["INCLUDE", "Breakfast"],
      ["INCLUDE", "Free Parking"],
      ["EXCLUDE", "Lunch"],
      ["EXCLUDE", "Airport Pickup"],
    ];

    for (const [type, name] of productItems) {
      await client.query(
        `
          INSERT INTO "ProductItem" (
            id,
            "productId",
            type,
            name,
            "createdAt",
            "updatedAt"
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            NOW(),
            NOW()
          )
        `,
        [
          crypto.randomUUID(),
          productId,
          type,
          name,
        ]
      );
    }

    // =====================================================
    // BOOKING
    // =====================================================

    const bookingId = crypto.randomUUID();

    await client.query(
      `
        INSERT INTO "Booking" (
          id,
          "userId",
          "productId",
          "bookingCode",
          "orderId",
          "nameGuest",
          email,
          phone,
          "checkIn",
          "checkOut",
          "totalGuest",
          "totalPrice",
          status,
          "paymentStatus",
          "paymentMethod",
          "transactionId",
          "paidAt",
          "expiredAt",
          note,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19,
          NOW(),
          NOW()
        )
      `,
      [
        bookingId,
        userId,
        productId,
        "BK202608010001",
        "ORDER-202608010001",
        "Budi Santoso",
        "budi@gmail.com",
        "08123456789",
        new Date("2026-08-01"),
        new Date("2026-08-03"),
        4,
        "3000000",
        "PAID",
        "PAID",
        "bank_transfer",
        "TXN-202608010001",
        new Date(),
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        "Late check in",
      ]
    );

    // =====================================================
    // BLOG
    // =====================================================

    await client.query(
      `
        INSERT INTO "Blog" (
          id,
          title,
          slug,
          thumbnail,
          content,
          "createdAt",
          "updatedAt"
        )
        VALUES
          ($1, $2, $3, $4, $5, NOW(), NOW()),
          ($6, $7, $8, $9, $10, NOW(), NOW())
        ON CONFLICT (slug)
        DO NOTHING
      `,
      [
        crypto.randomUUID(),
        "Tips Memilih Villa",
        "tips-memilih-villa",
        "/uploads/blog1.jpg",
        "Lorem ipsum dolor sit amet.",

        crypto.randomUUID(),
        "Liburan Bersama Keluarga",
        "liburan-keluarga",
        "/uploads/blog2.jpg",
        "Lorem ipsum dolor sit amet.",
      ]
    );

    // =====================================================
    // VOUCHER
    // =====================================================

    await client.query(
      `
        INSERT INTO "Voucher" (
          id,
          code,
          description,
          discount,
          "minPurchase",
          "dateExpired",
          status,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          NOW(),
          NOW()
        )
        ON CONFLICT (code)
        DO NOTHING
      `,
      [
        crypto.randomUUID(),
        "WELCOME10",
        "Diskon 10%",
        10,
        1000000,
        new Date("2027-01-01"),
        true,
      ]
    );

    // =====================================================
    // PARTNER
    // =====================================================

    await client.query(
      `
        INSERT INTO "Partner" (
          id,
          image,
          status,
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1,
          $2,
          $3,
          NOW(),
          NOW()
        )
      `,
      [
        crypto.randomUUID(),
        "partner.png",
        true,
      ]
    );

    await client.query("COMMIT");

    console.log("✅ Seeding selesai");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("❌ Seeding gagal:", error);

    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();

