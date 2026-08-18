import { prisma } from "@/lib/prisma";
import {
  BookingStatus,
  PaymentStatus,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authorizeUser, responseAuth } from "@/lib/auth";
import { responseError, serializeBigInt } from "@/lib/helper";
import { getPagination } from "@/lib/pagination";
import pool from "@/lib/db";
import { buildBookingFilter, getBookings } from "@/lib/querry/booking.query";

export async function GET(req: NextRequest) {
  let client;

  try {
    const { searchParams } = new URL(req.url);

    // ==========================
    // PAGINATION
    // ==========================

    const {
      page,
      limit,
      offset,
    } = getPagination(req);

    // ==========================
    // FILTER
    // ==========================

    const filter = {
      search:
        searchParams.get("search")?.trim() ?? "",

      status:
        searchParams.get("status")?.trim() ?? "",
    };

    // ==========================
    // STATUS VALIDATION
    // ==========================

    const allowedStatus = [
      "PENDING",
      "PAID",
      "CANCELLED",
      "EXPIRED",
      "FAILED",
    ];

    if (
      filter.status &&
      !allowedStatus.includes(filter.status)
    ) {
      return NextResponse.json(
        {
          status: false,
          code: 400,
          message: "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // CONNECT DB
    // ==========================

    client = await pool.connect();

    // ==========================
    // FILTER
    // ==========================

    const {
      whereSql,
      params,
      nextParamIndex,
    } = buildBookingFilter(filter);

    // ==========================
    // BOOKINGS
    // ==========================

    const {
      bookings,
      total,
    } = await getBookings(
      client,
      whereSql,
      params,
      limit,
      offset,
      nextParamIndex
    );

    // ==========================
    // FORMAT
    // ==========================

    const data = serializeBigInt(bookings);

    // ==========================
    // RESPONSE
    // ==========================

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

// Booking Public
export async function POST(req: NextRequest) {
  try {

    const currentUser = await authorizeUser(req);
    const userId = currentUser.id;
    const body = await req.json();
    
    const {
      productId,
      nameGuest,
      email,
      phone,
      checkIn,
      checkOut,
      totalGuest,
      discount,
      totalPrice,
      visitorType,
      note,
    } = body;

    const missingFields: string[] = [];

    if (!productId) missingFields.push("productId");
    if (!nameGuest) missingFields.push("nameGuest");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!checkIn) missingFields.push("checkIn");
    if (!checkOut) missingFields.push("checkOut");
    if (!totalGuest) missingFields.push("totalGuest");
    if (discount === undefined || discount === null) missingFields.push("discount");
    if (totalPrice === undefined || totalPrice === null) missingFields.push("totalPrice");
    if (!visitorType) missingFields.push("visitorType");
    if (!note) missingFields.push("note");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          status: false,
          message: `Field berikut wajib diisi: ${missingFields.join(", ")}`,
          errors: missingFields,
        },
        {
          status: 400,
        }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
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

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        {
          status: false,
          message: "Format tanggal tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        {
          status: false,
          message: "Tanggal check out harus setelah check in.",
        },
        {
          status: 400,
        }
      );
    }

    if (Number(totalGuest) > product.capacity) {
      return NextResponse.json(
        {
          status: false,
          message: `Maksimal tamu ${product.capacity} orang.`,
        },
        {
          status: 400,
        }
      );
    }

    // cek bentrok booking
    const overlap = await prisma.booking.findFirst({
      where: {
        productId,
        paymentStatus: {
          in: [PaymentStatus.PENDING, PaymentStatus.PAID],
        },
        status: {
          not: BookingStatus.CANCELLED,
        },
        AND: [
          {
            checkIn: {
              lt: end,
            },
          },
          {
            checkOut: {
              gt: start,
            },
          },
        ],
      },
    });

    if (overlap) {
      return NextResponse.json(
        {
          status: false,
          message: "Villa sudah dibooking pada tanggal tersebut.",
        },
        {
          status: 400,
        }
      );
    }

    const nights = Math.max(
      1,
      Math.ceil(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    const grossAmount = Number(totalPrice);

    const bookingCode =
      "BK" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    const orderId =
      "ORDER-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000);

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 24);

    // ============================
    // INSERT BOOKING
    // ============================

    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        orderId,
        userId,

        productId,

        nameGuest,
        email,
        phone,

        checkIn: start,
        checkOut: end,

        totalGuest: Number(totalGuest),

        discount: Number(discount),
        totalPrice: Number(totalPrice),

        note,

        status: BookingStatus.PENDING,

        paymentStatus: PaymentStatus.PENDING,

        paymentMethod: null,
        paymentToken: null,
        paymentUrl: null,
        transactionId: null,

        expiredAt,
      },
    });

    return NextResponse.json(
      serializeBigInt({
        status: true,
        message: "Booking berhasil dibuat.",
        data: booking,
      })
    );
  } catch (error) {

    const authResponse = responseAuth(error);

    if (authResponse) {
      return authResponse;
    }

    console.error(error);

    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development"
            ? {
                name: error instanceof Error ? error.name : undefined,
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
              }
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}






















// export async function POST(req: NextRequest) {
//   try {

//     const currentUser = await authorizeUser(req);
//     const userId = currentUser.id;
//     const body = await req.json();

//     const {
//       productId,
//       nameGuest,
//       email,
//       phone,
//       checkIn,
//       checkOut,
//       totalGuest,
//       discount,
//       totalPrice,
//       visitorType,
//       note,
//     } = body;

//     const missingFields: string[] = [];

//     if (!productId) missingFields.push("productId");
//     if (!nameGuest) missingFields.push("nameGuest");
//     if (!email) missingFields.push("email");
//     if (!phone) missingFields.push("phone");
//     if (!checkIn) missingFields.push("checkIn");
//     if (!checkOut) missingFields.push("checkOut");
//     if (!totalGuest) missingFields.push("totalGuest");
//     if (discount === undefined || discount === null) missingFields.push("discount");
//     if (totalPrice === undefined || totalPrice === null) missingFields.push("totalPrice");
//     if (!visitorType) missingFields.push("visitorType");
//     if (!note) missingFields.push("note");

//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: `Field berikut wajib diisi: ${missingFields.join(", ")}`,
//           errors: missingFields,
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const product = await prisma.product.findUnique({
//       where: {
//         id: productId,
//       },
//     });

//     if (!product) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: "Produk tidak ditemukan.",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     const start = new Date(checkIn);
//     const end = new Date(checkOut);

//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: "Format tanggal tidak valid.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     if (end <= start) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: "Tanggal check out harus setelah check in.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     if (Number(totalGuest) > product.capacity) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: `Maksimal tamu ${product.capacity} orang.`,
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     // cek bentrok booking
//     const overlap = await prisma.booking.findFirst({
//       where: {
//         productId,
//         paymentStatus: {
//           in: [PaymentStatus.PENDING, PaymentStatus.PAID],
//         },
//         status: {
//           not: BookingStatus.CANCELLED,
//         },
//         AND: [
//           {
//             checkIn: {
//               lt: end,
//             },
//           },
//           {
//             checkOut: {
//               gt: start,
//             },
//           },
//         ],
//       },
//     });

//     if (overlap) {
//       return NextResponse.json(
//         {
//           status: false,
//           message: "Villa sudah dibooking pada tanggal tersebut.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const nights = Math.max(
//       1,
//       Math.ceil(
//         (end.getTime() - start.getTime()) /
//           (1000 * 60 * 60 * 24)
//       )
//     );

//     const grossAmount = Number(totalPrice);

//     const bookingCode =
//       "BK" +
//       Date.now() +
//       Math.floor(Math.random() * 1000);

//     const orderId =
//       "ORDER-" +
//       Date.now() +
//       "-" +
//       Math.floor(Math.random() * 1000);

//     const expiredAt = new Date();
//     expiredAt.setHours(expiredAt.getHours() + 24);

//     let paymentUrl = "";
//     let snapToken = "";

//     const isProduction =
//       process.env.MIDTRANS_IS_PRODUCTION === "true";

//     const midtransBaseUrl = isProduction
//       ? "https://app.midtrans.com"
//       : "https://app.sandbox.midtrans.com";

//     try {
//       const response = await fetch(
//         `${
//           process.env.MIDTRANS_IS_PRODUCTION === "true"
//             ? "https://app.midtrans.com"
//             : "https://app.sandbox.midtrans.com"
//         }/snap/v1/transactions`,
//         {
//           method: "POST",
//           headers: {
//             Authorization:
//               "Basic " +
//               Buffer.from(
//                 `${process.env.MIDTRANS_SERVER_KEY}:`
//               ).toString("base64"),
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: 
//             JSON.stringify({
//               transaction_details: {
//                 order_id: orderId,
//                 gross_amount: grossAmount,
//               },
//               credit_card: {
//                 secure: true
//               }
//             }),
//         }
//       );try {
//       const response = await fetch(
//         `${midtransBaseUrl}/snap/v1/transactions`,
//         {
//           method: "POST",
//           headers: {
//             Authorization:
//               "Basic " +
//               Buffer.from(
//                 `${process.env.MIDTRANS_SERVER_KEY}:`
//               ).toString("base64"),
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: 
//             JSON.stringify({
//               transaction_details: {
//                 order_id: orderId,
//                 gross_amount: grossAmount,
//               },
//               credit_card: {
//                 secure: true
//               }
//             }),
//         }
//       );

//       const transaction = await response.json();

//       if (!response.ok) {
//         console.error("Midtrans Error:", transaction);

//         return NextResponse.json(
//           {
//             status: false,
//             message: isProduction
//               ? "Gagal membuat transaksi Midtrans."
//               : "Gagal membuat transaksi Midtrans (Sandbox).",
//             error: transaction,
//           },
//           {
//             status: response.status,
//           }
//         );
//       }

//       paymentUrl = transaction.redirect_url;
//       snapToken = transaction.token;

//       console.log(
//         `[Midtrans ${isProduction ? "Production" : "Sandbox"}]`,
//         transaction
//       );
//     } catch (err: any) {
//       console.error("========== MIDTRANS ERROR ==========");
//       console.error(err);
//       console.error("====================================");

//       return NextResponse.json(
//         {
//           status: false,
//           message: isProduction
//             ? "Gagal terhubung ke Midtrans."
//             : "Gagal terhubung ke Midtrans Sandbox.",
//           error:
//             process.env.NODE_ENV === "development"
//               ? {
//                   name: err?.name,
//                   message: err?.message,
//                   cause: err?.cause,
//                   stack: err?.stack,
//                 }
//               : undefined,
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     } catch (err) {
//       console.error(err);

//       return NextResponse.json(
//         {
//           status: false,
//           message: "Gagal terhubung ke Midtrans.",
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     // ============================
//     // INSERT BOOKING
//     // ============================

//     const booking = await prisma.booking.create({
//       data: {
//         bookingCode,
//         orderId,
//         userId,

//         productId,

//         nameGuest,
//         email,
//         phone,

//         checkIn: start,
//         checkOut: end,

//         totalGuest: Number(totalGuest),

//         discount: Number(discount),
//         totalPrice: Number(totalPrice),

//         note,

//         status: BookingStatus.PENDING,
//         paymentStatus: PaymentStatus.PENDING,

//         expiredAt,

//         paymentUrl,
//       }
//     });

//     return NextResponse.json(
//       serializeBigInt({
//         status: true,
//         message: "Booking berhasil dibuat.",
//         data: booking,
//         paymentUrl,
//         snapToken,
//       })
//     );
//   } catch (error) {

//     const authResponse = responseAuth(error);

//     if (authResponse) {
//       return authResponse;
//     }

//     console.error(error);

//     return NextResponse.json(
//       {
//         status: false,
//         message: "Internal Server Error",
//         error:
//           process.env.NODE_ENV === "development"
//             ? {
//                 name: error instanceof Error ? error.name : undefined,
//                 message: error instanceof Error ? error.message : String(error),
//                 stack: error instanceof Error ? error.stack : undefined,
//               }
//             : undefined,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }