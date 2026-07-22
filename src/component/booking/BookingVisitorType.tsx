"use client";

import { useState } from "react";

export default function BookingVisitorType() {
  const [type, setType] = useState("self");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="grid gap-6 md:grid-cols-2">

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-5 transition hover:border-blue-500">

          <input
            type="radio"
            checked={type === "self"}
            onChange={() => setType("self")}
          />

          <span>I am the visitor</span>

        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-5 transition hover:border-blue-500">

          <input
            type="radio"
            checked={type === "other"}
            onChange={() => setType("other")}
          />

          <span>I am booking for someone else</span>

        </label>

      </div>

    </div>
  );
}