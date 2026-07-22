"use client";

import { Landmark, Store } from "lucide-react";
import { useState } from "react";

const banks = [
  "BCA Virtual Account",
  "BNI Virtual Account",
  "BRI Virtual Account",
  "Mandiri Virtual Account",
  "CIMB Virtual Account",
];

export default function PaymentMethod() {
  const [selected, setSelected] = useState("BCA Virtual Account");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold">
        Payment Method
      </h2>

      <div className="space-y-6">

        <div>

          <div className="mb-4 flex items-center gap-2">

            <Landmark className="text-blue-600" />

            <span className="font-semibold">
              Virtual Account
            </span>

          </div>

          <div className="space-y-3">

            {banks.map((bank) => (

              <label
                key={bank}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition

                ${
                  selected === bank
                    ? "border-blue-600 bg-blue-50"
                    : "hover:border-blue-300"
                }
                `}
              >

                <div className="flex items-center gap-3">

                  <input
                    type="radio"
                    checked={selected === bank}
                    onChange={() => setSelected(bank)}
                  />

                  {bank}

                </div>

              </label>

            ))}

          </div>

        </div>

        <div>

          <div className="flex items-center gap-2">

            <Store className="text-blue-600" />

            <span className="font-semibold">
              Convenience Store
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}