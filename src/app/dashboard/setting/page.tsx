"use client";

import { useState } from "react";
import Image from "next/image";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { ArrowLeft, Settings, Camera } from "lucide-react";

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

                <div className="rounded-3xl bg-gray-100 p-10">

                    {/* Header */}

                    <div className="mb-8">

                        <button
                            type="button"
                            onClick={() => history.back()}
                            className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
                        >
                            <ArrowLeft size={22} />
                            <span>Kembali</span>
                        </button>

                        <h1 className="text-3xl font-bold">
                            Pengaturan
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Kelola informasi profil akun administrator.
                        </p>

                    </div>

                    {/* Banner */}

                    <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">

                        <div className="flex items-center gap-5 px-8 py-7">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                                <Settings
                                    size={30}
                                    className="text-white"
                                />

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold text-white">
                                    Profil Administrator
                                </h2>

                                <p className="mt-1 text-blue-100">
                                    Perbarui informasi akun administrator.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Form */}

                    <form className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                        {/* Header */}

                        <div className="border-b border-gray-200 px-8 py-6">

                            <div className="flex items-center gap-3">

                                <div className="h-10 w-1 rounded-full bg-blue-600" />

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Informasi Profil
                                    </h2>

                                    <p className="text-gray-500">
                                        Lengkapi data administrator.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="space-y-8 p-8">

                            {/* Foto */}

                            <div>

                                <label className="mb-3 block font-semibold">
                                    Foto Profil
                                </label>

                                <div className="flex items-center gap-6">

                                    <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-300 bg-gray-100">

                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-400">
                                                <Camera size={40} />
                                            </div>
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
                                            JPG, PNG atau WEBP (Max 2MB)
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="Administrator"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="admin"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        defaultValue="admin@example.com"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        No. Telepon
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="081234567890"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

                                </div>

                            </div>

                            <hr />

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        Password Baru
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Kosongkan jika tidak diubah"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 block font-semibold">
                                        Konfirmasi Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Ulangi password baru"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                    />

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
                                Simpan Perubahan
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}