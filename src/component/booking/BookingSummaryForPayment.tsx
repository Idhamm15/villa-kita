"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Users,
} from "lucide-react";

interface BookingSummaryForPaymentProps {
  booking: {
    bookingCode: string;
    checkIn: string;
    checkOut: string;
    totalGuest: number;

    discount: number;
    totalPrice: number;

    product: {
      name: string;
      thumbnail: string;
      capacity: number;
      price: string;
      serviceFee: string;
    };
  };
}

export default function BookingSummaryForPayment({
  booking,
}: BookingSummaryForPaymentProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(booking.checkOut).getTime() -
        new Date(booking.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Ringkasan Booking
        </h2>

        <p className="text-xs text-gray-500">
          Booking ID : {booking.bookingCode}
        </p>
      </div>

      <div className="space-y-5 p-6">

        <div className="flex gap-4">

          <div className="relative h-24 w-24 overflow-hidden rounded-xl">
            <Image
              src={booking.product.thumbnail}
              alt={booking.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">

            <h3 className="font-semibold">
              {booking.product.name}
            </h3>

            <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Maks {booking.product.capacity} Tamu
            </span>

          </div>

        </div>

        <hr />

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Check In</span>
            <span>{formatDate(booking.checkIn)}</span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>
            <span>{formatDate(booking.checkOut)}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Tamu</span>
            <span>{booking.totalGuest} Orang</span>
          </div>

          <div className="flex justify-between">
            <span>Lama Menginap</span>
            <span>{nights} Malam</span>
          </div>

        </div>

        <hr />

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Harga Villa</span>
            <span>{formatCurrency(Number(booking.product.price))}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(Number(booking.totalPrice))}</span>
          </div>

          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>{formatCurrency(Number(booking.product.serviceFee))}</span>
          </div>

          <div className="flex justify-between">
            <span>Diskon</span>
            <span className="text-green-600">
              -{formatCurrency(Number(booking.discount))}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold text-blue-600">
            <span>Total</span>
            <span>{formatCurrency(Number(booking.totalPrice))}</span>
          </div>

        </div>

        <hr />

        <div className="space-y-2 text-sm">

          <div className="flex items-center gap-2 text-green-600">
            <BadgeCheck size={18} />
            Konfirmasi Instan
          </div>

          <div className="flex items-center gap-2 text-green-600">
            <CircleDollarSign size={18} />
            Pembatalan Gratis
          </div>

        </div>

      </div>

    </div>
  );
}