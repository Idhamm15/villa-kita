"use client";

type VisitorType = "SELF" | "SOMEONE_ELSE";

interface BookingForm {
  nameGuest: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  totalGuest: number;
  note: string;

}

interface ContactFormProps<T extends BookingForm> {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  loading: boolean;
  onSubmit: () => void;
}

export default function ContactForm<T extends BookingForm>({
  value,
  onChange,
  loading,
  onSubmit,
}: ContactFormProps<T>) {
  const handleChange = <K extends keyof BookingForm>(
    key: K,
    val: BookingForm[K]
  ) => {
    onChange((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="border-b border-gray-300 p-6">
        <h2 className="text-xl font-bold">
          Detail Kontak
        </h2>

        <p className="text-sm text-gray-500">
          Lengkapi data tamu yang akan menginap/trip.
        </p>
      </div>

      <div className="space-y-5 p-6">
        {/* Nama */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Nama Lengkap
          </label>

          <input
            type="text"
            value={value.nameGuest}
            onChange={(e) =>
              handleChange(
                "nameGuest",
                e.target.value
              )
            }
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* HP & Email */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nomor HP
            </label>

            <input
              type="tel"
              value={value.phone}
              onChange={(e) =>
                handleChange(
                  "phone",
                  e.target.value
                )
              }
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={value.email}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }
              placeholder="email@example.com"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
        </div>

        {/* Check In Out */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Tanggal & Jam Check In
            </label>

            <input
              type="datetime-local"
              value={value.checkIn}
              onChange={(e) =>
                handleChange("checkIn", e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tanggal & Jam Check Out
            </label>

            <input
              type="datetime-local"
              value={value.checkOut}
              onChange={(e) =>
                handleChange("checkOut", e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
        </div>

        {/* Total Tamu */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Total Tamu
          </label>

          <input
            type="number"
            min={1}
            value={value.totalGuest}
            onChange={(e) =>
              handleChange(
                "totalGuest",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Catatan */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Catatan (Opsional)
          </label>

          <textarea
            rows={4}
            value={value.note}
            onChange={(e) =>
              handleChange(
                "note",
                e.target.value
              )
            }
            placeholder="Contoh: Datang malam hari, membutuhkan extra bed, dll."
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 p-6">
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Memproses..."
            : "Lanjut ke Pembayaran"}
        </button>
      </div>
    </div>
  );
}