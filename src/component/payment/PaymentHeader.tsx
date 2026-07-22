"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentHeader() {
  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Payment Method
        </h1>

        <p className="mt-2 text-gray-500">
          Choose your preferred payment method.
        </p>
      </div>

      <Link
        href="/booking/addon"
        className="inline-flex items-center gap-2 text-gray-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

    </div>
  );
}