"use client";

import { useState } from "react";

export default function PaymentType() {

  const [type, setType] = useState("full");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold">
        Payment Type
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <label className="rounded-xl border p-5">

          <div className="flex items-center gap-3">

            <input
              type="radio"
              checked={type === "full"}
              onChange={() => setType("full")}
            />

            Full Payment

          </div>

        </label>

        <label className="rounded-xl border p-5">

          <div className="flex items-center gap-3">

            <input
              type="radio"
              checked={type === "dp"}
              onChange={() => setType("dp")}
            />

            Down Payment

          </div>

        </label>

      </div>

    </div>
  );
}