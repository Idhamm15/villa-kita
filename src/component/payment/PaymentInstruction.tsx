"use client";

import { Copy } from "lucide-react";
import { copyText } from "../CopyText";

export default function PaymentInstruction() {
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden">

      <div className="bg-blue-100 flex items-center justify-between px-6 py-5">

        <h2 className="text-2xl font-bold">
          BNI Virtual Account
        </h2>

        <img
          src="/payment/bni.png"
          className="h-8"
        />

      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">

        You can only transfer from BNI account.

      </div>

      <div className="divide-y">

        <div className="flex justify-between p-6">

          <div>

            <p className="text-gray-500">
              Account Number
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              8578492943415789
            </h3>

          </div>

        <button
            onClick={() =>
                copyText(
                "8578492943415789",
                "Account number successfully copied."
                )
            }
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
              Rp875.000
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