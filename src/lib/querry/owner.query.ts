import { PoolClient } from "pg";

interface OwnerFilter {
  search: string;
}

export function buildOwnerFilter(filter: OwnerFilter) {
  const conditions: string[] = [
    `u."role" = 'OWNER'`,
  ];

  const params: any[] = [];

  let paramIndex = 1;

  // ==========================
  // SEARCH
  // ==========================

  if (filter.search) {
    conditions.push(`
      (
        u.fullname ILIKE $${paramIndex}
        OR u.email ILIKE $${paramIndex}
        OR u.phone ILIKE $${paramIndex}
      )
    `);

    params.push(`%${filter.search}%`);
    paramIndex++;
  }

  return {
    whereSql: `WHERE ${conditions.join(" AND ")}`,

    params,

    nextParamIndex: paramIndex,
  };
}

export async function getOwners(
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

      FROM "User" u

      ${whereSql}
    `,
    params
  );

  const total = countResult.rows[0].total;

  // ==========================
  // DATA
  // ==========================

  const ownerParams = [
    ...params,
    limit,
    offset,
  ];

  const ownersResult = await client.query(
    `
      SELECT
        u.id,
        u.fullname,
        u.email,
        u.phone,
        u."nameBank",
        u."noBank",
        u."registerAt"

      FROM "User" u

      ${whereSql}

      ORDER BY u."registerAt" DESC

      LIMIT $${paramIndex}
      OFFSET $${paramIndex + 1}
    `,
    ownerParams
  );

  return {
    owners: ownersResult.rows,
    total,
  };
}