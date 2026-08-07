"use client";

interface BookingVisitorTypeProps {
  value: "SELF" | "SOMEONE_ELSE";
  onChange: (value: "SELF" | "SOMEONE_ELSE") => void;
}

export default function BookingVisitorType({
  value,
  onChange,
}: BookingVisitorTypeProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="grid gap-6 md:grid-cols-2">

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-5 transition ${
            value === "SELF"
              ? "border-blue-600 bg-blue-50"
              : "hover:border-blue-500"
          }`}
        >
          <input
            type="radio"
            checked={value === "SELF"}
            onChange={() => onChange("SELF")}
          />

          <div>
            <p className="font-semibold">
              Saya akan Menginap/Trip
            </p>

            <p className="text-sm text-gray-500">
              Pemesan dan tamu yang menginap/trip adalah orang yang sama.
            </p>
          </div>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-5 transition ${
            value === "SOMEONE_ELSE"
              ? "border-blue-600 bg-blue-50"
              : "hover:border-blue-500"
          }`}
        >
          <input
            type="radio"
            checked={value === "SOMEONE_ELSE"}
            onChange={() => onChange("SOMEONE_ELSE")}
          />

          <div>
            <p className="font-semibold">
              Saya memesan untuk orang lain
            </p>

            <p className="text-sm text-gray-500">
              Booking ini ditujukan untuk tamu lain yang akan menginap/trip.
            </p>
          </div>
        </label>

      </div>
    </div>
  );
}