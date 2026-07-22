import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Users,
  BadgeCheck,
  CircleDollarSign,
  TicketPercent,
} from "lucide-react";

export default function BookingSummary() {
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">Booking Summary</h2>
        <p className="text-xs text-gray-500">Booking ID : 24824646</p>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Villa"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">
              Villa Kita Bogor
            </h3>

            <p className="text-sm text-gray-500">
              Deluxe Room
            </p>

            <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              2 Guest
            </span>
          </div>
        </div>

        <hr />

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarDays size={18} />
              Check In
            </div>

            <span>23 Jul 2026</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock3 size={18} />
              Check Out
            </div>

            <span>24 Jul 2026</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Users size={18} />
              Guest
            </div>

            <span>2 Adult</span>
          </div>

        </div>

        <hr />

        {/* Voucher */}
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
              placeholder="Masukkan kode voucher"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Gunakan
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Punya kode promo? Masukkan di sini untuk mendapatkan potongan harga.
          </p>
        </div>

        <hr />

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Room Price</span>

            <span>Rp850.000</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>

            <span>Rp25.000</span>
          </div>

          <div className="flex justify-between">
            <span>Diskon</span>

            <span>Rp0</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold text-blue-600">
            <span>Total</span>

            <span>Rp875.000</span>
          </div>

        </div>

        <hr />

        <div className="space-y-2 text-sm">

          <div className="flex items-center gap-2 text-green-600">
            <BadgeCheck size={18} />
            Instant Confirmation
          </div>

          <div className="flex items-center gap-2 text-green-600">
            <CircleDollarSign size={18} />
            Free Cancellation
          </div>

        </div>

      </div>
    </div>
  );
}