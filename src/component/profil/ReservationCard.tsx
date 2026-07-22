"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Eye,
  Receipt,
} from "lucide-react";

export default function ReservationCard() {
  return (
    <div className="rounded-2xl bg-white shadow-md transition hover:shadow-lg ">

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-gray-400 p-6 md:flex-row md:items-center">

        <div>
          <p className="text-sm text-gray-500">
            Booking ID
          </p>

          <h2 className="text-lg font-bold">
            #1784713027139
          </h2>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
          Confirmed
        </span>

      </div>

      {/* Body */}
      <div className="p-6 ">

        <h3 className="text-xl font-semibold">
          Villa Kita Bogor
        </h3>

        <p className="mt-1 flex items-center gap-2 text-gray-500">
          <MapPin size={16} />
          Bogor, Jawa Barat
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div>
            <p className="text-sm text-gray-500">
              Check In
            </p>

            <div className="mt-1 flex items-center gap-2 font-medium">
              <CalendarDays size={18} />
              23 Jul 2026
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Check Out
            </p>

            <div className="mt-1 flex items-center gap-2 font-medium">
              <Clock3 size={18} />
              24 Jul 2026
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total
            </p>

            <div className="mt-1 text-lg font-bold text-blue-600">
              Rp875.000
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-400 bg-gray-50 px-6 py-4">

        <span className="text-sm text-gray-500">
          Booked on 20 Jul 2026
        </span>

        <div className="flex gap-3">

          <Link
            href="/booking/invoice"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Receipt size={16} />
            Invoice
          </Link>

          <Link
            href="/profile/my-booking/1784713027139"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Eye size={16} />
            Detail
          </Link>

        </div>

      </div>

    </div>
  );
}