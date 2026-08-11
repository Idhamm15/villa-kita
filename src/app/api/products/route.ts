import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isImage, saveImage } from "@/lib/upload";
import { fileUrl } from "@/lib/url";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseError, serializeBigInt } from "@/lib/helper";
import { authorizeAdminOwner } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  let client;

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page") ?? 1),
      1
    );

    const limit = Math.max(
      Number(searchParams.get("limit") ?? 10),
      1
    );

    const search = searchParams.get("search")?.trim() ?? "";
    const location = searchParams.get("location")?.trim() ?? "";
    const isActive = searchParams.get("isActive");
    const type = searchParams.get("type")?.trim() ?? "";

    const offset = (page - 1) * limit;

    // ==========================
    // VALIDASI TYPE
    // ==========================

    const allowedType = ["Villa", "Trip"];

    if (type && !allowedType.includes(type)) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Invalid type",
        },
        { status: 400 }
      );
    }

    client = await pool.connect();

    // ==========================
    // BUILD WHERE
    // ==========================

    const conditions: string[] = [];
    const params: any[] = [];

    let paramIndex = 1;

    // ==========================
    // SEARCH
    // ==========================

    if (search) {
      conditions.push(`
        (
          p.name ILIKE $${paramIndex}
          OR p.slug ILIKE $${paramIndex}
        )
      `);

      params.push(`%${search}%`);
      paramIndex++;
    }

    // ==========================
    // LOCATION
    // ==========================

    if (location) {
      conditions.push(`
        p.location ILIKE $${paramIndex}
      `);

      params.push(`%${location}%`);
      paramIndex++;
    }

    // ==========================
    // IS ACTIVE
    // ==========================

    if (isActive === "true" || isActive === "false") {
      conditions.push(`
        p."isActive" = $${paramIndex}
      `);

      params.push(isActive === "true");
      paramIndex++;
    }

    // ==========================
    // TYPE
    // ==========================

    if (type) {
      conditions.push(`
        p."typeProperty" = $${paramIndex}
      `);

      params.push(type);
      paramIndex++;
    }

    const whereSql =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    // ==========================
    // COUNT
    // ==========================

    const countResult = await client.query(
      `
        SELECT COUNT(*)::int AS total
        FROM "Product" p
        ${whereSql}
      `,
      params
    );

    const total = countResult.rows[0].total;

    // ==========================
    // PRODUCTS
    // ==========================

    const productParams = [
      ...params,
      limit,
      offset,
    ];

    const productsResult = await client.query(
      `
        SELECT
          p.*,

          json_build_object(
            'id', u.id,
            'fullname', u.fullname,
            'email', u.email
          ) AS owner

        FROM "Product" p

        LEFT JOIN "User" u
          ON u.id = p."ownerId"

        ${whereSql}

        ORDER BY p."createdAt" DESC

        LIMIT $${paramIndex}
        OFFSET $${paramIndex + 1}
      `,
      productParams
    );

    const products = productsResult.rows;

    // ==========================
    // GET IMAGES & ITEMS
    // ==========================

    for (const product of products) {
      const [imagesResult, itemsResult] = await Promise.all([
        client.query(
          `
            SELECT *
            FROM "ProductImage"
            WHERE "productId" = $1
          `,
          [product.id]
        ),

        client.query(
          `
            SELECT *
            FROM "ProductItem"
            WHERE "productId" = $1
            ORDER BY sort ASC
          `,
          [product.id]
        ),
      ]);

      product.images = imagesResult.rows;
      product.items = itemsResult.rows;
    }

    // ==========================
    // FORMAT DATA
    // ==========================

    const data = products.map((product) => ({
      ...product,

      priceStart:
        product.priceStart !== null
          ? product.priceStart.toString()
          : null,

      price:
        product.price !== null
          ? product.price.toString()
          : null,

      thumbnail: product.thumbnail
        ? fileUrl(product.thumbnail)
        : null,

      images: (product.images ?? []).map((image: any) => ({
        ...image,
        image: image.image
          ? fileUrl(image.image)
          : null,
      })),
    }));

    return NextResponse.json({
      status: true,
      code: 200,
      message: "Success",
      data,

      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
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

export async function POST(req: NextRequest) {
  let client;

  try {
    const user = await authorizeAdminOwner(req);

    const userId = user.id;

    const form = await req.formData();

    // ==========================
    // GET FORM DATA
    // ==========================

    const ownerId = form.get("ownerId")?.toString() ?? "";

    const thumbnail = form.get("thumbnail") as File | null;

    const name = form.get("name")?.toString() ?? "";
    const slug = form.get("slug")?.toString() ?? "";

    const location = form.get("location")?.toString() ?? "";
    const address = form.get("address")?.toString() ?? "";
    const urlMaps = form.get("urlMaps")?.toString() ?? "";

    const description = form.get("description")?.toString() ?? "";

    const totalBedroom = Number(form.get("totalBedroom") ?? 0);
    const totalBathroom = Number(form.get("totalBathroom") ?? 0);
    const maxGuest = Number(form.get("maxGuest") ?? 0);
    const wide = Number(form.get("wide") ?? 0);

    const stock = Number(form.get("stock") ?? 1);
    const capacity = Number(form.get("capacity") ?? 1);

    const typeUnit = form.get("typeUnit")?.toString() ?? "";

    const isActive =
      (form.get("isActive")?.toString() ?? "true") === "true";

    // ==========================
    // ENUM ARRAY
    // ==========================

    const type = form
      .getAll("type")
      .map((value) => value.toString().trim())
      .filter(Boolean);

    const bookingType = form
      .getAll("bookingType")
      .map((value) => value.toString().trim())
      .filter(Boolean);

    // ==========================
    // IMAGES
    // ==========================

    const images = form.getAll("images") as File[];

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !ownerId ||
      !name ||
      !slug ||
      !address ||
      !urlMaps ||
      !description
    ) {
      return NextResponse.json(
        {
          status: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // PRICE
    // ==========================

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

    const priceStart = BigInt(priceStartValue.toString());
    const price = BigInt(priceValue.toString());

    // ==========================
    // DATABASE CLIENT
    // ==========================

    client = await pool.connect();

    // ==========================
    // CEK OWNER
    // ==========================

    const ownerResult = await client.query(
      `
        SELECT id, fullname, email
        FROM "User"
        WHERE id = $1
        LIMIT 1
      `,
      [ownerId]
    );

    if (ownerResult.rowCount === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Owner tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // ==========================
    // CEK SLUG
    // ==========================

    const slugResult = await client.query(
      `
        SELECT id
        FROM "Product"
        WHERE slug = $1
        LIMIT 1
      `,
      [slug]
    );

    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      if (!isImage(image)) continue;

      const path = await saveImage(image, "products");

      imagePaths.push(path);
    }

    // ==========================
    // THUMBNAIL
    // ==========================

    let thumbnailPath = "";

    if (thumbnail && thumbnail.size > 0) {
      if (!isImage(thumbnail)) {
        return NextResponse.json(
          {
            status: false,
            message: "Thumbnail harus berupa gambar.",
          },
          { status: 400 }
        );
      }

      thumbnailPath = await saveImage(thumbnail, "products");
    } else if (imagePaths.length > 0) {
      thumbnailPath = imagePaths[0];
    }

    if (!thumbnailPath) {
      return NextResponse.json(
        {
          status: false,
          message: "Thumbnail wajib diisi.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // TRANSACTION
    // ==========================

    await client.query("BEGIN");

    try {
      const productId = crypto.randomUUID();

      // ==========================
      // INSERT PRODUCT
      // ==========================

      const productResult = await client.query(
        `
          INSERT INTO "Product" (
            id,
            "ownerId",
            "createdBy",
            name,
            slug,
            location,
            address,
            "urlMaps",
            description,
            "totalBedroom",
            "totalBathroom",
            "maxGuest",
            wide,
            "priceStart",
            price,
            stock,
            capacity,
            "typeUnit",
            "isActive",
            thumbnail,
            type,
            "bookingType",
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
            NOW(),
            NOW()
          )
          RETURNING *
        `,
        [
          productId,
          ownerId,
          userId,
          name,
          slug,
          location,
          address,
          urlMaps,
          description,
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
          thumbnailPath,
          type,
          bookingType,
        ]
      );

      const product = productResult.rows[0];

      // ==========================
      // INSERT PRODUCT IMAGES
      // ==========================

      if (imagePaths.length > 0) {
        for (const imagePath of imagePaths) {
          await client.query(
            `
              INSERT INTO "ProductImage" (
                id,
                "productId",
                image
              )
              VALUES (
                $1,
                $2,
                $3
              )
            `,
            [
              crypto.randomUUID(),
              productId,
              imagePath,
            ]
          );
        }
      }

      await client.query("COMMIT");

      // ==========================
      // RESPONSE
      // ==========================

      const responseData = {
        ...product,

        priceStart: product.priceStart?.toString(),
        price: product.price?.toString(),

        thumbnail: fileUrl(product.thumbnail),

        images: imagePaths.map((image, index) => ({
          id: index,
          productId,
          image: fileUrl(image),
        })),
      };

      return NextResponse.json(
        {
          status: true,
          code: 201,
          message: "Produk berhasil dibuat.",
          data: responseData,
        },
        {
          status: 201,
        }
      );
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
