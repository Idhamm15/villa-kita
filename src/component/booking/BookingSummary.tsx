"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  TicketPercent,
  Users,
} from "lucide-react";
import { useMemo } from "react";

interface BookingSummaryProps {
  booking: {
    bookingCode?: string;
    checkIn: string;
    checkOut: string;
    totalGuest: number;
    discount?: number;
    voucherCode?: string;
  };

  product: {
    id: string;
    name?: string;
    thumbnail?: string;
    roomName?: string;
    capacity?: number;
    price: number;
    serviceFee?: number;
  };

  onPriceChange?: (price: number) => void;

  onApplyVoucher?: () => void;
  onVoucherChange?: (value: string) => void;
}

export default function BookingSummary({
  booking,
  product,
  onApplyVoucher,
  onVoucherChange,
}: BookingSummaryProps) {
  const serviceFee = Number(product.serviceFee) ?? 25000; 

  const nights = useMemo(() => {
    if (!booking.checkIn || !booking.checkOut) return 1;

    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);

    const diff =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    return Math.max(1, Math.ceil(diff));
  }, [booking.checkIn, booking.checkOut]);

  const subtotal = Number(product.price) * nights;

  const discount = booking.discount ?? 0;

  const total =
    subtotal +
    serviceFee -
    discount;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Ringkasan Booking
        </h2>

        <p className="text-xs text-gray-500">
          Booking ID : {booking.bookingCode ?? "-"}
        </p>
      </div>

      <div className="space-y-5 p-6">

        {/* PRODUCT */}

        <div className="flex gap-4">

          <div className="relative h-24 w-24 overflow-hidden rounded-xl">

            <Image
              src={product.thumbnail ?? "/images/no-image.png"}
              alt={product.name ?? "Product Image"}
              fill
              className="object-cover"
            />
            
          </div>

          <div className="flex-1">

            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              {product.roomName ?? "Villa"}
            </p>

            <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Maks {product.capacity} Tamu
            </span>

          </div>

        </div>

        <hr />

        {/* STAY */}

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">

            <div className="flex items-center gap-2 text-gray-500">
              <CalendarDays size={18} />
              Check In
            </div>

            <span>
              {formatDate(booking.checkIn)}
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex items-center gap-2 text-gray-500">
              <Clock3 size={18} />
              Check Out
            </div>

            <span>
              {formatDate(booking.checkOut)}
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex items-center gap-2 text-gray-500">
              <Users size={18} />
              Total Tamu
            </div>

            <span>
              {booking.totalGuest} Orang
            </span>

          </div>

          <div className="flex justify-between">

            <span>Lama Menginap/Trip</span>

            <span>
              {nights} Malam
            </span>

          </div>

        </div>

        <hr />

        {/* VOUCHER */}

        <div>

          <div className="mb-3 flex items-center gap-2">

            <TicketPercent
              size={18}
              className="text-orange-500"
            />

            <h3 className="font-semibold">
              Voucher
            </h3>

          </div>

          <div className="flex gap-2">

            <input
              type="text"
              value={booking.voucherCode ?? ""}
              onChange={(e) =>
                onVoucherChange?.(e.target.value)
              }
              placeholder="Masukkan kode voucher"
              className="flex-1 rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={onApplyVoucher}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Gunakan
            </button>

          </div>

        </div>

        <hr />

        {/* PRICE */}

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>
              Harga Villa/Trip
            </span>

            <span>
              {formatCurrency(product.price)}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Lama Menginap/Trip
            </span>

            <span>
              {nights} x
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Subtotal
            </span>

            <span>
              {formatCurrency(subtotal)}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Biaya Layanan
            </span>

            <span>
              {formatCurrency(serviceFee)}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Diskon
            </span>

            <span className="text-green-600">
              -{formatCurrency(discount)}
            </span>

          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold text-blue-600">

            <span>Total</span>

            <span>
              {formatCurrency(total)}
            </span>

          </div>

        </div>

        <hr />

        {/* BENEFIT */}

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