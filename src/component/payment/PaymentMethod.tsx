"use client";

import {
  Landmark,
  Wallet,
  QrCode,
} from "lucide-react";

export const virtualAccounts = [
  {
    label: "BCA Virtual Account",
    value: "bca",
  },
  {
    label: "BNI Virtual Account",
    value: "bni",
  },
  {
    label: "BRI Virtual Account",
    value: "bri",
  },
  {
    label: "Mandiri Bill",
    value: "mandiri",
  },
  {
    label: "Permata Virtual Account",
    value: "permata",
  },
  {
    label: "CIMB Virtual Account",
    value: "cimb",
  },
];

const eWallets = [
  {
    label: "GoPay",
    value: "gopay",
  },
  {
    label: "ShopeePay",
    value: "shopeepay",
  },
];

const qrPayments = [
  {
    label: "QRIS (DANA, OVO, GoPay, LinkAja, dll)",
    value: "qris",
  },
];

interface PaymentMethodProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PaymentMethod({
  value,
  onChange,
}: PaymentMethodProps) {
  const renderOption = (
    label: string,
    optionValue: string
  ) => (
    <label
      key={optionValue}
      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
        value === optionValue
          ? "border-blue-600 bg-blue-50"
          : "hover:border-blue-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          checked={value === optionValue}
          onChange={() => onChange(optionValue)}
        />

        <span>{label}</span>
      </div>
    </label>
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Payment Method
      </h2>

      <div className="space-y-8">
        {/* Virtual Account */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Landmark className="text-blue-600" />
            <span className="font-semibold">
              Virtual Account
            </span>
          </div>

          <div className="space-y-3">
            {virtualAccounts.map((item) =>
              renderOption(item.label, item.value)
            )}
          </div>
        </div>

        {/* E-Wallet */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Wallet className="text-blue-600" />
            <span className="font-semibold">
              E-Wallet
            </span>
          </div>

          <div className="space-y-3">
            {eWallets.map((item) =>
              renderOption(item.label, item.value)
            )}
          </div>
        </div>

        {/* QRIS */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <QrCode className="text-blue-600" />
            <span className="font-semibold">
              QRIS
            </span>
          </div>

          <div className="space-y-3">
            {qrPayments.map((item) =>
              renderOption(item.label, item.value)
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            QRIS dapat dibayar menggunakan DANA, OVO,
            GoPay, LinkAja, mobile banking, dan aplikasi
            lain yang mendukung QRIS.
          </p>
        </div>
      </div>
    </div>
  );
}