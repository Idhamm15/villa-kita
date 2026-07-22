export default function ContactForm() {
  return (
    <div className="rounded-2xl bg-white shadow-lg">

      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Contact Details
        </h2>

        <p className="text-sm text-gray-500">
          Voucher information
        </p>
      </div>

      <div className="space-y-5 p-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
              placeholder="+62..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
              placeholder="email@example.com"
            />
          </div>

        </div>

        <button className="mt-4 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
          Continue to Addon
        </button>

      </div>

    </div>
  );
}