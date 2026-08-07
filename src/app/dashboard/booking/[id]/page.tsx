"use client";

import { useState } from "react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";

export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);


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

        </div>

        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Detail Booking
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    ID: cmrp2wsgi000004l5f6licdji
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                {/* LEFT */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Informasi Tamu */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-xl font-bold">
                            Informasi Tamu
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Nama Lengkap
                                </p>
                                <p className="font-semibold">
                                    WW ee
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>
                                <p className="font-semibold">
                                    123@gmail.com
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    No. Telepon
                                </p>
                                <p className="font-semibold">
                                    0858989686
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Informasi Properti */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold">
                            Informasi Properti
                        </h2>

                        <h3 className="text-xl font-semibold">
                            Villa Pak Maryono
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Bogor, Jawa Barat
                        </p>

                        <p className="mt-3 font-semibold text-blue-600">
                            Harga per malam Rp 1.500.000
                        </p>

                    </div>

                    {/* Detail Booking */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-xl font-bold">
                            Detail Booking
                        </h2>

                        <div className="grid gap-8 md:grid-cols-2">

                            <div className="space-y-6">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Check-in
                                    </p>

                                    <p className="font-semibold">
                                        Jumat, 17 Juli 2026
                                    </p>

                                    <p className="text-purple-600">
                                        14.00 WIB
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Durasi Menginap
                                    </p>

                                    <p className="font-semibold">
                                        1 Malam
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Jumlah Kamar
                                    </p>

                                    <p className="font-semibold">
                                        1 Kamar
                                    </p>
                                </div>

                            </div>

                            <div className="space-y-6">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Check-out
                                    </p>

                                    <p className="font-semibold">
                                        Sabtu, 18 Juli 2026
                                    </p>

                                    <p className="text-purple-600">
                                        12.00 WIB
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Jumlah Tamu
                                    </p>

                                    <p className="font-semibold">
                                        2 Dewasa
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tipe Unit
                                    </p>

                                    <p className="font-semibold">
                                        Standard
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                    {/* Status */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold">
                            Status
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Booking Status
                                </p>

                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                    Cancelled
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Payment Status
                                </p>

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold">
                                    Expired
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Pembayaran */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold">
                            Pembayaran
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rp 1.500.000</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Pajak</span>
                                <span>Rp 165.000</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-lg font-bold">

                                <span>Total</span>

                                <span className="text-purple-600">
                                    Rp 1.665.000
                                </span>

                            </div>

                            <hr />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Metode Pembayaran
                                </p>

                                <p className="font-semibold">
                                    Bank Transfer
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Informasi Lain */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold">
                            Informasi Lainnya
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Dibuat pada
                                </p>

                                <p className="font-semibold">
                                    17/07/2026 22:14
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Payment Reference
                                </p>

                                <p className="font-semibold break-all">
                                    cmrp2wsgi000004l5f6licdji
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        </div>

    </main>

    </div>
  );
}