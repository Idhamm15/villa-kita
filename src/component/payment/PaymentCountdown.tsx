"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

export default function PaymentCountdown() {
  const [seconds, setSeconds] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const second = String(seconds % 60).padStart(2, "0");

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg">

      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            We're holding this booking for you
          </h3>

          <p className="mt-1 text-sm text-blue-100">
            Complete your payment before the countdown ends.
          </p>

        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white/20 px-5 py-3 backdrop-blur">

          <Clock3 className="text-yellow-300" size={22} />

          <span className="text-2xl font-bold tracking-widest text-yellow-300">
            {hour}:{minute}:{second}
          </span>

        </div>

      </div>

    </div>
  );
}