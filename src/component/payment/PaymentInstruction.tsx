"use client";

import { Copy } from "lucide-react";
import { copyText } from "../CopyText";
import { virtualAccounts } from "./PaymentMethod";

interface PaymentInstructionProps {
  booking: {
    paymentToken: string;
    totalPrice: string;
    paymentStatus: string;
    paymentMethod: string;
  };
}

export default function PaymentInstruction({ booking }: PaymentInstructionProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
  }).format(value);

  const paymentStatus = booking.paymentStatus?.trim().toUpperCase();

  const paymentMethod =
    virtualAccounts.find(
      (item) => item.value === booking.paymentMethod
    ) ?? {
      label: booking.paymentMethod,
      value: booking.paymentMethod,
    };
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden">

      <div className="bg-blue-100 flex items-center justify-between px-6 py-5">

      <h2 className="text-2xl font-bold">
        {paymentMethod.label}
      </h2>

      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
        You can only transfer from {paymentMethod.label}.
      </div>

      <div className="flex items-center justify-between border-b bg-white px-6 py-4">
        <span className="text-sm text-gray-500">
          Payment Status
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            paymentStatus === "PAID"
              ? "bg-green-100 text-green-700"
              : paymentStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : paymentStatus === "EXPIRED"
              ? "bg-red-100 text-red-700"
              : paymentStatus === "FAILED"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {paymentStatus}
        </span>
      </div>

      <div className="divide-y">

        <div className="flex justify-between p-6">

          <div>

            <p className="text-gray-500">
              Account Number
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {booking.paymentToken ?? "Loading..."}
            </h3>

          </div>

          <button
            disabled={!booking.paymentToken}
            onClick={() => {
              if (!booking.paymentToken) return;

              copyText(
                booking.paymentToken,
                "Account number successfully copied."
              );
            }}
          >
            <Copy size={18} />
          </button>

        </div>

        <div className="flex justify-between p-6">

          <div>

            <p className="text-gray-500">
              Account Holder
            </p>

            <h3 className="mt-2 font-semibold">
              PT Villa Kita Indonesia
            </h3>

          </div>

        </div>

        <div className="flex justify-between p-6">

          <div>

            <p className="text-gray-500">
              Transfer Amount
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600">
              {formatCurrency(Number(booking.totalPrice))}
            </h3>

          </div>

          <button className="text-blue-600 font-semibold">
            <Copy size={18}/>
          </button>

        </div>

       
      </div>

    </div>
  );
}