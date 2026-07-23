"use client";

import { useState } from "react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";

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
            Tambah Partner Baru
            </h1>

            <p className="mt-2 text-gray-500">
            Tambahkan partner baru untuk ditampilkan pada homepage.
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
                Informasi Partner
                </h2>

                <p className="mt-1 text-blue-100">
                Lengkapi informasi partner di bawah ini.
                </p>

            </div>

            </div>

        </div>

        {/* ===== FORM ===== */}
        <form className="rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden">

            {/* Judul Form */}
            <div className="border-b border-gray-400 px-8 py-6">

            <div className="flex items-center gap-3">

                <div className="h-10 w-1 rounded-full bg-blue-600" />

                <div>

                <h2 className="text-2xl font-bold">
                    Informasi Dasar
                </h2>

                <p className="text-gray-500">
                    Masukkan informasi partner.
                </p>

                </div>

            </div>

            </div>

            <div className="space-y-8 p-8">

            {/* Logo */}
            <div>

                <label className="mb-3 block font-semibold">
                Logo Partner
                </label>

                <div className="flex gap-6">

                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">

                    {preview ? (
                    <Image
                        src={preview}
                        alt="preview"
                        fill
                        className="object-contain p-2"
                    />
                    ) : (
                    <span className="text-gray-400">
                        Preview
                    </span>
                    )}

                </div>

                <div className="flex-1">

                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="block w-full rounded-xl border border-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-100 file:px-5 file:py-3 file:font-semibold file:text-blue-700"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                    Format JPG, PNG, WEBP (Max 2MB)
                    </p>

                </div>

                </div>

            </div>

            {/* Nama */}
            <div>

                <label className="mb-2 block font-semibold">
                Nama Partner
                </label>

                <input
                type="text"
                placeholder="Nama perusahaan / partner"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                />

            </div>

            {/* Urutan */}
            <div>

                <label className="mb-2 block font-semibold">
                Urutan Tampil
                </label>

                <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                />

                <p className="mt-2 text-sm text-gray-500">
                Semakin kecil angka, semakin awal ditampilkan.
                </p>

            </div>

            {/* Status */}
            <div>

                <label className="flex items-center gap-3">

                <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded"
                />

                <span className="font-medium">
                    Aktif (tampilkan di homepage)
                </span>

                </label>

            </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 border-t border-gray-400 bg-gray-50 px-8 py-6">

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
                Simpan Partner
            </button>

            </div>

        </form>

        </div>

    </main>

    </div>
  );
}