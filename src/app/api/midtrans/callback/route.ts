import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import crypto from "crypto";
import { responseError } from "@/lib/helper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      order_id,
      transaction_id,
      transaction_status,
      status_code,
      gross_amount,
      signature_key,
      fraud_status,
      payment_type,
      transaction_time,
      expiry_time,
    } = body;

    if (
      !order_id ||
      !transaction_status ||
      !status_code ||
      !gross_amount ||
      !signature_key
    ) {
      return NextResponse.json(
        {
          status: false,
          message: "Payload tidak lengkap.",
        },
        {
          status: 400,
        }
      );
    }

    // ===========================
    // VERIFY SIGNATURE
    // ===========================

    const expectedSignature = crypto
      .createHash("sha512")
      .update(
        order_id +
          status_code +
          gross_amount +
          process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (expectedSignature !== signature_key) {
      return NextResponse.json(
        {
          status: false,
          message: "Signature Midtrans tidak valid.",
        },
        {
          status: 401,
        }
      );
    }

    // ===========================
    // FIND BOOKING
    // ===========================

    const booking = await prisma.booking.findUnique({
      where: {
        orderId: order_id,
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

    const dataUpdate: any = {
      transactionId: transaction_id,
      paymentMethod: payment_type,
    };

    // ===========================
    // UPDATE STATUS
    // ===========================

    switch (transaction_status) {
      case "capture":
        if (fraud_status === "accept") {
          dataUpdate.paymentStatus = PaymentStatus.PAID;
          dataUpdate.status = BookingStatus.PAID;
          dataUpdate.paidAt = new Date(transaction_time);
        }
        break;

      case "settlement":
        dataUpdate.paymentStatus = PaymentStatus.PAID;
        dataUpdate.status = BookingStatus.PAID;
        dataUpdate.paidAt = new Date(transaction_time);
        break;

      case "pending":
        dataUpdate.paymentStatus = PaymentStatus.PENDING;
        dataUpdate.status = BookingStatus.PENDING;
        break;

      case "deny":
        dataUpdate.paymentStatus = PaymentStatus.FAILED;
        break;

      case "cancel":
        dataUpdate.paymentStatus = PaymentStatus.CANCELLED;
        dataUpdate.status = BookingStatus.CANCELLED;
        break;

      case "expire":
        dataUpdate.paymentStatus = PaymentStatus.EXPIRED;
        dataUpdate.status = BookingStatus.CANCELLED;
        dataUpdate.expiredAt = new Date(expiry_time);
        break;

      case "refund":
      case "partial_refund":
        dataUpdate.paymentStatus = PaymentStatus.REFUND;
        break;

      default:
        console.log(
          "Status Midtrans belum ditangani:",
          transaction_status
        );
    }

    // ===========================
    // UPDATE BOOKING
    // ===========================

    await prisma.booking.update({
      where: {
        orderId: order_id,
      },
      data: dataUpdate,
    });

    return NextResponse.json({
      status: true,
      message: "Callback berhasil diproses.",
    });
  } catch (error: any) {
    console.error(error);

    return responseError(error);
  }
}