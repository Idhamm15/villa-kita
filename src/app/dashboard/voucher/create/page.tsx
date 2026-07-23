"use client";

import { useState } from "react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { ArrowLeft, Plus } from "lucide-react";

export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [preview, setPreview] = useState<string | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));
    };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

    {/* Sidebar */}
    <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
    />

    {/* Main */}
    <main className="flex-1 overflow-y-auto p-4 md:p-6">

        <NavbarDashboard
        onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="rounded-3xl bg-gray-100 p-12">

        {/* ===== HEADER ===== */}
        <div className="mb-8">
            <button
                type="button"
                onClick={() => history.back()}
                className="mb-5 flex items-center gap-2 text-gray-500 transition hover:text-blue-600"
            >
                <ArrowLeft size={22} />
                <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
                Buat Voucher Baru
            </h1>

            <p className="mt-2 text-gray-500">
                Buat voucher promo untuk memberikan potongan harga kepada pelanggan.
            </p>
        </div>

        {/* ===== BANNER ===== */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">

            <div className="flex items-center gap-5 px-8 py-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                <Plus
                size={30}
                className="text-white"
                />

            </div>

            <div>

                <h2 className="text-3xl font-bold text-white">
                Informasi Voucher
                </h2>

                <p className="mt-1 text-blue-100">
                Lengkapi informasi voucher di bawah ini.
                </p>

            </div>

            </div>

        </div>

        {/* ===== FORM ===== */}
        <form className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-gray-300 px-8 py-6">

                <div className="flex items-center gap-3">

                    <div className="h-10 w-1 rounded-full bg-blue-600" />

                    <div>

                        <h2 className="text-2xl font-bold">
                            Informasi Voucher
                        </h2>

                        <p className="text-gray-500">
                            Lengkapi informasi voucher promo.
                        </p>

                    </div>

                </div>

            </div>

            <div className="space-y-8 p-8">

                {/* Kode */}
                <div>

                    <label className="mb-2 block font-semibold">
                        Kode Voucher
                    </label>

                    <input
                        type="text"
                        placeholder="Contoh: HEMAT10"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                    />

                </div>

                {/* Deskripsi */}
                <div>

                    <label className="mb-2 block font-semibold">
                        Deskripsi
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Deskripsi voucher"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                    />

                </div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-semibold">
                            Tipe Diskon
                        </label>

                        <select className="w-full rounded-xl border border-gray-300 px-4 py-3">

                            <option>Persentase (%)</option>
                            <option>Nominal (Rp)</option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Nilai Diskon
                        </label>

                        <input
                            type="number"
                            placeholder="10"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Min. Pembelian (Rp)
                        </label>

                        <input
                            type="number"
                            placeholder="0"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Maks. Diskon (Rp)
                        </label>

                        <input
                            type="number"
                            placeholder="Kosongkan jika tidak ada batas"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Berlaku Dari
                        </label>

                        <input
                            type="date"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Berlaku Sampai
                        </label>

                        <input
                            type="date"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        />

                    </div>

                </div>

                {/* Limit */}
                <div>

                    <label className="mb-2 block font-semibold">
                        Batas Penggunaan
                    </label>

                    <input
                        type="number"
                        placeholder="Kosongkan untuk unlimited"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    />

                </div>

                {/* Checkbox */}
                <div className="flex flex-col gap-4 md:flex-row">

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5 rounded"
                        />

                        Berlaku untuk semua properti

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5 rounded"
                        />

                        Aktif

                    </label>

                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 border-t border-gray-300 bg-gray-50 px-8 py-6">

                <button
                    type="button"
                    className="rounded-xl border border-gray-300 px-8 py-3 font-semibold hover:bg-gray-100"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 font-semibold text-white"
                >
                    Simpan Voucher
                </button>

            </div>

        </form>

        </div>

    </main>

    </div>
  );
}