import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage, deleteImage, isImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseError, serializeBigInt } from "@/lib/helper";
import pool from "@/lib/db";
import { authorizeAdminOwner } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let client;

  try {
    const { id } = await params;

    client = await pool.connect();

    // ==========================================
    // GET PRODUCT
    // ==========================================

    const productResult = await client.query(
      `
        SELECT
          p.*,

          TRIM(BOTH '{}' FROM p."type"::text) AS type,

          TRIM(BOTH '{}' FROM p."bookingType"::text) AS "bookingType",

          row_to_json(o.*) AS owner,

          row_to_json(u.*) AS "user"

        FROM "Product" p

        LEFT JOIN "User" o
          ON o.id = p."ownerId"

        LEFT JOIN "User" u
          ON u.id = p."createdBy"

        WHERE p.id = $1

        LIMIT 1
      `,
      [id]
    );

    if (productResult.rows.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const product = productResult.rows[0];

    // ==========================================
    // GET IMAGES
    // ==========================================

    const imagesResult = await client.query(
      `
        SELECT *
        FROM "ProductImage"
        WHERE "productId" = $1
        ORDER BY "createdAt" ASC
      `,
      [id]
    );

    // ==========================================
    // GET ITEMS
    // ==========================================

    const itemsResult = await client.query(
      `
        SELECT *
        FROM "ProductItem"
        WHERE "productId" = $1
        ORDER BY sort ASC
      `,
      [id]
    );

    // ==========================================
    // FORMAT DATA
    // ==========================================

    product.images = imagesResult.rows.map((image) => ({
      ...image,
      image: image.image
        ? fileUrl(image.image)
        : null,
    }));

    product.items = itemsResult.rows;

    product.thumbnail = product.thumbnail
      ? fileUrl(product.thumbnail)
      : null;

    // ==========================================
    // BIGINT
    // ==========================================

    const data = {
      ...product,

      priceStart:
        product.priceStart !== null
          ? product.priceStart.toString()
          : null,

      price:
        product.price !== null
          ? product.price.toString()
          : null,

      serviceFee:
        product.serviceFee !== null
          ? product.serviceFee.toString()
          : null,
    };

    return NextResponse.json({
      status: true,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let client;

  try {
    const { id } = await params;
    const form = await req.formData();

    // ==========================================
    // AUTH
    // ==========================================

    const user = await authorizeAdminOwner(req);
    const userId = user.id;

    // ==========================================
    // DATABASE
    // ==========================================

    client = await pool.connect();

    // ==========================================
    // CHECK PRODUCT
    // ==========================================

    const productResult = await client.query(
      `
        SELECT *
        FROM "Product"
        WHERE id = $1
        LIMIT 1
      `,
      [id]
    );

    if (productResult.rows.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // ==========================================
    // GET FORM DATA
    // ==========================================

    const ownerId = form.get("ownerId") as string | null;

    const name = form.get("name") as string;
    const slug = form.get("slug") as string;
    const description = form.get("description") as string;

    const location = form.get("location") as string;
    const address = form.get("address") as string;
    const urlMaps = form.get("urlMaps") as string;

    const totalBedroom = Number(
      form.get("totalBedroom") ?? 0
    );

    const totalBathroom = Number(
      form.get("totalBathroom") ?? 0
    );

    const maxGuest = Number(
      form.get("maxGuest") ?? 0
    );

    const wide = Number(
      form.get("wide") ?? 0
    );

    const priceStartValue = form.get("priceStart");
    const priceValue = form.get("price");

    if (!priceStartValue || !priceValue) {
      return NextResponse.json(
        {
          status: false,
          message: "Harga wajib diisi.",
        },
        { status: 400 }
      );
    }

    const priceStart = BigInt(
      priceStartValue.toString()
    );

    const price = BigInt(
      priceValue.toString()
    );

    const stock = Number(
      form.get("stock") ?? 1
    );

    const capacity = Number(
      form.get("capacity") ?? 1
    );

    const typeUnit = form.get("typeUnit") as string;

    const isActive =
      (form.get("isActive") ?? "true") === "true";

    // ==========================================
    // TYPE
    // ==========================================

    const type = form
      .getAll("type")
      .map((value) => value.toString().trim())
      .filter(Boolean);

    const bookingType = form
      .getAll("bookingType")
      .map((value) => value.toString().trim())
      .filter(Boolean);

    // ==========================================
    // IMAGES
    // ==========================================

    const images = form.getAll("images") as File[];

    // ==========================================
    // CHECK SLUG
    // ==========================================

    const slugExist = await client.query(
      `
        SELECT id
        FROM "Product"
        WHERE slug = $1
          AND id <> $2
        LIMIT 1
      `,
      [slug, id]
    );

    if (slugExist.rows.length > 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Slug sudah digunakan.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // UPLOAD IMAGES
    // ==========================================

    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      imagePaths.push(
        await saveImage(image, "products")
      );
    }

    // ==========================================
    // TRANSACTION
    // ==========================================

    await client.query("BEGIN");

    try {
      // ========================================
      // UPDATE PRODUCT
      // ========================================

const updatedResult = await client.query(
  `
    UPDATE "Product"
    SET
      "ownerId" = $1,

      name = $2,
      slug = $3,
      description = $4,

      location = $5,
      address = $6,
      "urlMaps" = $7,

      "totalBedroom" = $8,
      "totalBathroom" = $9,
      "maxGuest" = $10,
      wide = $11,

      "priceStart" = $12,
      price = $13,

      stock = $14,
      capacity = $15,

      "typeUnit" = $16,

      "isActive" = $17,

      "type" = $18,
      "bookingType" = $19,

      "updatedAt" = CURRENT_TIMESTAMP

    WHERE id = $20

    RETURNING *
  `,
  [
    ownerId,

    name,
    slug,
    description,

    location,
    address,
    urlMaps,

    totalBedroom,
    totalBathroom,
    maxGuest,
    wide,

    priceStart.toString(),
    price.toString(),

    stock,
    capacity,

    typeUnit,

    isActive,

    type,
    bookingType,

    id,
  ]
);

      if (updatedResult.rows.length === 0) {
        throw new Error(
          "Gagal memperbarui produk."
        );
      }

      const updated = updatedResult.rows[0];

      // ========================================
      // UPDATE IMAGES
      // ========================================

      if (imagePaths.length > 0) {
        await client.query(
          `
            DELETE FROM "ProductImage"
            WHERE "productId" = $1
          `,
          [id]
        );

        for (const imagePath of imagePaths) {
          await client.query(
            `
              INSERT INTO "ProductImage" (
                id,
                "productId",
                image,
                "createdAt",
                "updatedAt"
              )
              VALUES (
                gen_random_uuid(),
                $1,
                $2,
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
              )
            `,
            [id, imagePath]
          );
        }
      }

      // ========================================
      // GET IMAGES
      // ========================================

      const imagesResult = await client.query(
        `
          SELECT *
          FROM "ProductImage"
          WHERE "productId" = $1
          ORDER BY "createdAt" ASC
        `,
        [id]
      );

      // ========================================
      // GET ITEMS
      // ========================================

      const itemsResult = await client.query(
        `
          SELECT *
          FROM "ProductItem"
          WHERE "productId" = $1
          ORDER BY sort ASC
        `,
        [id]
      );

      // ========================================
      // GET OWNER
      // ========================================

      const ownerResult = await client.query(
        `
          SELECT *
          FROM "User"
          WHERE id = $1
          LIMIT 1
        `,
        [updated.ownerId]
      );

      // ========================================
      // GET CREATED BY USER
      // ========================================

      const userResult = await client.query(
        `
          SELECT *
          FROM "User"
          WHERE id = $1
          LIMIT 1
        `,
        [updated.createdBy]
      );

      // ========================================
      // FORMAT DATA
      // ========================================

      const data = {
        ...updated,

        type: updated.type
          ? String(updated.type).replace(
              /^\{|\}$/g,
              ""
            )
          : null,

        bookingType: updated.bookingType
          ? String(updated.bookingType).replace(
              /^\{|\}$/g,
              ""
            )
          : null,

        priceStart:
          updated.priceStart !== null
            ? updated.priceStart.toString()
            : null,

        price:
          updated.price !== null
            ? updated.price.toString()
            : null,

        serviceFee:
          updated.serviceFee !== null
            ? updated.serviceFee.toString()
            : null,

        thumbnail: updated.thumbnail
          ? fileUrl(updated.thumbnail)
          : null,

        owner:
          ownerResult.rows.length > 0
            ? ownerResult.rows[0]
            : null,

        user:
          userResult.rows.length > 0
            ? userResult.rows[0]
            : null,

        images: imagesResult.rows.map(
          (image) => ({
            ...image,
            image: image.image
              ? fileUrl(image.image)
              : null,
          })
        ),

        items: itemsResult.rows,
      };

      await client.query("COMMIT");

      return NextResponse.json({
        status: true,
        message: "Produk berhasil diperbarui.",
        data,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error(error);

    return responseError(error);
  } finally {
    if (client) {
      client.release();
    }
  }
}



export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let client;

  try {
    const { id } = await params;

    // ==========================================
    // AUTH
    // ==========================================

    await authorizeAdminOwner(req);

    // ==========================================
    // DATABASE
    // ==========================================

    client = await pool.connect();

    // ==========================================
    // CHECK PRODUCT
    // ==========================================

    const productResult = await client.query(
      `
        SELECT id
        FROM "Product"
        WHERE id = $1
        LIMIT 1
      `,
      [id]
    );

    if (productResult.rows.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Produk tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================
    // TRANSACTION
    // ==========================================

    await client.query("BEGIN");

    try {
      // ========================================
      // DELETE IMAGES
      // ========================================

      await client.query(
        `
          DELETE FROM "ProductImage"
          WHERE "productId" = $1
        `,
        [id]
      );

      // ========================================
      // DELETE ITEMS
      // ========================================

      await client.query(
        `
          DELETE FROM "ProductItem"
          WHERE "productId" = $1
        `,
        [id]
      );

      // ========================================
      // DELETE PRODUCT
      // ========================================

      const deleteResult = await client.query(
        `
          DELETE FROM "Product"
          WHERE id = $1
          RETURNING id
        `,
        [id]
      );

      if (deleteResult.rows.length === 0) {
        throw new Error("Gagal menghapus produk.");
      }

      await client.query("COMMIT");

      return NextResponse.json({
        status: true,
        message: "Produk berhasil dihapus.",
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error(error);

    return responseError(error);
  } finally {
    if (client) {
      client.release();
    }
  }
}