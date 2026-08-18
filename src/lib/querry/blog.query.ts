import { PoolClient } from "pg";

interface BlogFilter {
  search: string;
  isPublished: string | null;
}

export function buildBlogFilter(filter: BlogFilter) {
  const conditions: string[] = [];
  const params: any[] = [];

  let paramIndex = 1;

  if (filter.search) {
    conditions.push(`
      (
        b.title ILIKE $${paramIndex}
        OR b.slug ILIKE $${paramIndex}
      )
    `);

    params.push(`%${filter.search}%`);
    paramIndex++;
  }

  if (
    filter.isPublished === "true" ||
    filter.isPublished === "false"
  ) {
    conditions.push(`
      b."isPublished" = $${paramIndex}
    `);

    params.push(
      filter.isPublished === "true"
    );

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

export async function getBlogs(
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

      FROM "Blog" b

      ${whereSql}
    `,
    params
  );

  const total = countResult.rows[0].total;

  const blogParams = [
    ...params,
    limit,
    offset,
  ];

  const blogsResult = await client.query(
    `
      SELECT
        b.*

      FROM "Blog" b

      ${whereSql}

      ORDER BY b."createdAt" DESC

      LIMIT $${paramIndex}
      OFFSET $${paramIndex + 1}
    `,
    blogParams
  );

  return {
    blogs: blogsResult.rows,
    total,
  };
}