import { PackageSearch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PurchaseEmpty() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>

        <p className="mt-2 text-gray-500">
          Track your current bookings and payment status.
        </p>
      </div>

      {/* Empty State */}
      <div className="rounded-2xl bg-white p-10 shadow-sm border">

        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <PackageSearch
              size={48}
              className="text-blue-600"
            />
          </div>

          <div className="flex-1">

            <h2 className="text-2xl font-bold">
              No Active Bookings Found
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              Anything you book will appear here. It looks like you
              haven't made any bookings yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Explore Villas
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}