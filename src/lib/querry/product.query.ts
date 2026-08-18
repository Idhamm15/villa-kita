import { PoolClient } from "pg";

interface ProductFilter {
  search: string;
  location: string;
  isActive: string | null;
  type: string;
}

export function buildProductFilter(filter: ProductFilter) {
  const conditions: string[] = [];
  const params: any[] = [];

  let paramIndex = 1;

  if (filter.search) {
    conditions.push(`
      (
        p.name ILIKE $${paramIndex}
        OR p.slug ILIKE $${paramIndex}
      )
    `);

    params.push(`%${filter.search}%`);
    paramIndex++;
  }

  if (filter.location) {
    conditions.push(`
      p.location ILIKE $${paramIndex}
    `);

    params.push(`%${filter.location}%`);
    paramIndex++;
  }

  if (
    filter.isActive === "true" ||
    filter.isActive === "false"
  ) {
    conditions.push(`
      p."isActive" = $${paramIndex}
    `);

    params.push(filter.isActive === "true");
    paramIndex++;
  }

  if (filter.type) {
    conditions.push(`
      p."typeProperty" = $${paramIndex}
    `);

    params.push(filter.type);
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

export async function getProducts(
  client: PoolClient,
  whereSql: string,
  params: any[],
  limit: number,
  offset: number,
  paramIndex: number
) {
  const countResult = await client.query(
    `
      SELECT COUNT(*)::int AS total
      FROM "Product" p
      ${whereSql}
    `,
    params
  );

  const total = countResult.rows[0].total;

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

  return {
    products: productsResult.rows,
    total,
  };
}

export async function getProductRelations(
  client: PoolClient,
  productId: string
) {
  const [imagesResult, itemsResult] = await Promise.all([
    client.query(
      `
        SELECT *
        FROM "ProductImage"
        WHERE "productId" = $1
      `,
      [productId]
    ),

    client.query(
      `
        SELECT *
        FROM "ProductItem"
        WHERE "productId" = $1
        ORDER BY sort ASC
      `,
      [productId]
    ),
  ]);

  return {
    images: imagesResult.rows,
    items: itemsResult.rows,
  };
}