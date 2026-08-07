"use client";

import { useState } from "react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
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
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        <NavbarDashboard
        onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="rounded-3xl bg-gray-100 p-12">

        {/* ===== HEADER ===== */}
        <div className="mb-8">

            <button
                type="button"
                onClick={() => history.back()}
                className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
            >
            <ArrowLeft size={22} />
            <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
            Tambah Owner Baru
            </h1>

            <p className="mt-2 text-gray-500">
            Tambahkan owner baru untuk ditampilkan pada homepage.
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
                Informasi Owner
                </h2>

                <p className="mt-1 text-blue-100">
                Lengkapi informasi owner di bawah ini.
                </p>

            </div>

            </div>

        </div>

        {/* ===== FORM ===== */}
        <form className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* Header Form */}
            <div className="border-b border-gray-200 px-8 py-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-blue-600" />

                    <div>
                        <h2 className="text-2xl font-bold">
                            Informasi Owner
                        </h2>
                        <p className="text-gray-500">
                            Lengkapi informasi owner di bawah ini.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8 p-8">

                {/* Nama */}
                <div>
                    <label className="mb-2 block font-semibold">
                        Nama
                    </label>

                    <input
                        type="text"
                        placeholder="Masukkan nama owner"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Masukkan email"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                {/* Telepon */}
                <div>
                    <label className="mb-2 block font-semibold">
                        Telepon
                    </label>

                    <input
                        type="text"
                        placeholder="08xxxxxxxxxx"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <hr className="border-gray-200" />

                {/* Informasi Bank */}
                <div>
                    <h3 className="mb-5 text-lg font-bold">
                        Informasi Bank
                    </h3>

                    <div className="space-y-6">

                        {/* Bank */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Bank
                            </label>

                            <select
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            >
                                <option>Pilih Bank</option>
                                <option>Bank BCA</option>
                                <option>Bank BRI</option>
                                <option>Bank Mandiri</option>
                                <option>Bank BNI</option>
                            </select>
                        </div>

                        {/* No Rekening */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                No. Rekening
                            </label>

                            <input
                                type="text"
                                placeholder="Masukkan nomor rekening"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />
                        </div>

                        {/* Nama Pemilik Rekening */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Nama Pemilik Rekening
                            </label>

                            <input
                                type="text"
                                placeholder="Masukkan nama pemilik rekening"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 border-t border-gray-200 bg-gray-50 px-8 py-6">

                <button
                    type="button"
                    className="rounded-xl border border-gray-300 px-8 py-3 font-semibold hover:bg-gray-100"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 font-semibold text-white hover:opacity-90"
                >
                    Simpan
                </button>

            </div>

        </form>

        </div>

    </main>

    </div>
  );
}