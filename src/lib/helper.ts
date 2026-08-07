import { NextResponse } from "next/server";

export function serializeBigInt(data: unknown) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint"
        ? value.toString()
        : value
    )
  );
}

export function responseError(error: unknown) {
  console.error(error);

  return NextResponse.json(
    {
      status: false,
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "development"
          ? {
              name:
                error instanceof Error
                  ? error.name
                  : "UnknownError",
              message:
                error instanceof Error
                  ? error.message
                  : String(error),
              stack:
                error instanceof Error
                  ? error.stack
                  : undefined,
            }
          : undefined,
    },
    {
      status: 500,
    }
  );
}