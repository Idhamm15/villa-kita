import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  PaymentStatus,
} from "@prisma/client";
import { serializeBigInt } from "@/lib/helper";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const booking = await prisma.booking.findUnique({
      where: {
        orderId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          status: false,
          message: "Booking tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      serializeBigInt({
        status: true,
        message: "Berhasil mengambil data booking.",
        data: booking,
      })
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development"
            ? {
                name: error?.name,
                message: error?.message,
                stack: error?.stack,
              }
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{ orderId: string }>;
  }
) {
  try {
    const { orderId } = await context.params;

    const body = await req.json();

    const {
      paymentMethod,
    } = body;


    if (!paymentMethod) {
      return NextResponse.json(
        {
          status: false,
          message: "Payment method wajib diisi",
        },
        {
          status: 400,
        }
      );
    }


    // =========================
    // GET BOOKING
    // =========================

    const booking = await prisma.booking.findUnique({
      where: {
        orderId,
      },
    });


    if (!booking) {
      return NextResponse.json(
        {
          status: false,
          message: "Booking tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }


    if (
      booking.paymentStatus === PaymentStatus.PAID
    ) {
      return NextResponse.json(
        {
          status: false,
          message: "Booking sudah dibayar",
        },
        {
          status: 400,
        }
      );
    }



    // =========================
    // MIDTRANS CONFIG
    // =========================


    const isProduction =
      process.env.MIDTRANS_IS_PRODUCTION === "true";


    const midtransUrl = isProduction
      ? "https://api.midtrans.com/v2/charge"
      : "https://api.sandbox.midtrans.com/v2/charge";



    // =========================
    // MIDTRANS PAYLOAD
    // =========================


    const payload = {
      payment_type: "bank_transfer",

      transaction_details: {
        order_id: booking.orderId,
        gross_amount: Number(
          booking.totalPrice
        ),
      },

      bank_transfer: {
        bank: paymentMethod
          .replace("_VA", "")
          .toLowerCase(),
      },
    };



    // =========================
    // REQUEST MIDTRANS
    // =========================


    const midtransResponse = await fetch(
      midtransUrl,
      {
        method: "POST",

        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.MIDTRANS_SERVER_KEY}:`
            ).toString("base64"),

          "Content-Type": "application/json",
          Accept: "application/json",
        },


        body: JSON.stringify(payload),
      }
    );


    const transaction =
      await midtransResponse.json();



    if (!midtransResponse.ok) {

      console.error(
        "MIDTRANS ERROR",
        transaction
      );


      return NextResponse.json(
        {
          status:false,
          message:"Gagal membuat pembayaran Midtrans",
          error:transaction,
        },
        {
          status:400,
        }
      );

    }



    // =========================
    // UPDATE BOOKING
    // =========================


    const updatedBooking =
      await prisma.booking.update({

        where:{
          orderId,
        },


        data:{

          paymentMethod,


          transactionId:
            transaction.transaction_id
            ?? null,


          paymentToken:
            transaction.va_numbers?.[0]
              ?.va_number
            ?? null,


          paymentStatus:
            PaymentStatus.PENDING,


          expiredAt:
            transaction.expiry_time
              ? new Date(
                  transaction.expiry_time
                )
              : null,

        }

      });



    return NextResponse.json(
      serializeBigInt({

      status:true,

      message:
        "Pembayaran berhasil dibuat",

      data:updatedBooking,

      payment:{
        transaction,
      }

    }));



  } catch(error:any){

    console.error(
      "PAYMENT ERROR",
      error
    );


    return NextResponse.json(
      {
        status:false,
        message:"Internal server error",

        error:
          process.env.NODE_ENV === "development"
          ? {
              message:error.message,
              stack:error.stack,
            }
          : undefined,
      },
      {
        status:500,
      }
    );

  }
}