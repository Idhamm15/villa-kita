"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";

export default function AccountInformation() {
  const [form, setForm] = useState({
    fullname: "Dham",
    email: "masdhamgaming@gmail.com",
    city: "Tegal",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your personal information.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <button className="border-b-2 border-blue-600 px-2 pb-3 font-semibold text-blue-600">
          Account Information
        </button>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">

        {/* Title */}
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-semibold">
            Personal Data
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6 p-6">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-gray-500">
              Your full name will appear on your profile.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500"
              readOnly
            />
          </div>

          {/* City */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              City of Residence
            </label>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-5">

          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium transition hover:bg-gray-100">
            <X size={18} />
            Cancel
          </button>

          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
            <Save size={18} />
            Save
          </button>

        </div>

      </div>

    </div>
  );
}