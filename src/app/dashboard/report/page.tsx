"use client";

import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { ArrowLeft, Download, Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex overflow-hidden bg-white">

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

                    <button
                        onClick={() => history.back()}
                        className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
                    >
                        <ArrowLeft size={20} />
                        Kembali
                    </button>

                    <h1 className="text-3xl font-bold">
                        Laporan Keuangan
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Monitoring pemasukan dan pengeluaran seluruh properti.
                    </p>

                    {/* Banner */}

                    <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700">

                        {/* <div className="flex items-center gap-5 px-8 py-8">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl text-white">
                                💰
                            </div>

                            <div>

                                <h2 className="text-3xl font-bold text-white">
                                    Ringkasan Keuangan
                                </h2>

                                <p className="mt-1 text-blue-100">
                                    Statistik pendapatan dan pengeluaran properti.
                                </p>

                            </div>

                        </div> */}

                    </div>

                    {/* Summary */}

                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {[
                            {
                                title: "Total Transaksi",
                                value: "245",
                                color: "text-blue-600",
                            },
                            {
                                title: "Pendapatan",
                                value: "Rp 150.000.000",
                                color: "text-green-600",
                            },
                            {
                                title: "Pengeluaran",
                                value: "Rp 30.000.000",
                                color: "text-red-600",
                            },
                            {
                                title: "Profit Bersih",
                                value: "Rp 120.000.000",
                                color: "text-purple-600",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <p className="text-gray-500">
                                    {item.title}
                                </p>

                                <h3 className={`mt-3 text-3xl font-bold ${item.color}`}>
                                    {item.value}
                                </h3>
                            </div>
                        ))}

                    </div>

                    {/* Filter */}

                    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold">
                            Filter Laporan
                        </h2>

                        <div className="grid gap-5 lg:grid-cols-5">

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Periode
                                </label>

                                <input
                                    type="month"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Properti
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                                    <option>Semua Properti</option>
                                </select>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Kategori
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                                    <option>Semua</option>
                                    <option>Pendapatan</option>
                                    <option>Pengeluaran</option>
                                </select>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Status
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                                    <option>Semua</option>
                                    <option>Lunas</option>
                                    <option>Pending</option>
                                </select>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Cari
                                </label>

                                <div className="relative">

                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4"
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">

                            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">

                                <Download size={18} />

                                Export Excel

                            </button>
                            <button className="flex ml-5 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">

                                <Search size={18} />

                                Filter

                            </button>

                        </div>

                    </div>

                    {/* Table */}

                    <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-200 px-8 py-6">

                            <h2 className="text-2xl font-bold">
                                Riwayat Transaksi
                            </h2>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="bg-gray-50">

                                    <tr className="text-left">

                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Invoice</th>
                                        <th className="px-6 py-4">Properti</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Deskripsi</th>
                                        <th className="px-6 py-4 text-right">
                                            Nominal
                                        </th>
                                        <th className="px-6 py-4">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {[
                                        {
                                            date: "17 Jul 2026",
                                            invoice: "INV-001",
                                            property: "Villa Pak Maryono",
                                            category: "Pendapatan",
                                            desc: "Booking Villa",
                                            amount: "Rp 1.500.000",
                                            status: "Lunas",
                                        },
                                        {
                                            date: "18 Jul 2026",
                                            invoice: "INV-002",
                                            property: "Villa Pak Maryono",
                                            category: "Pengeluaran",
                                            desc: "Laundry",
                                            amount: "Rp 200.000",
                                            status: "Selesai",
                                        },
                                        {
                                            date: "19 Jul 2026",
                                            invoice: "INV-003",
                                            property: "Hotel Mawar",
                                            category: "Pendapatan",
                                            desc: "Booking Hotel",
                                            amount: "Rp 900.000",
                                            status: "Lunas",
                                        },
                                    ].map((item, index) => (

                                        <tr
                                            key={index}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-5">
                                                {item.date}
                                            </td>

                                            <td className="px-6 py-5 font-medium">
                                                {item.invoice}
                                            </td>

                                            <td className="px-6 py-5">
                                                {item.property}
                                            </td>

                                            <td className="px-6 py-5">
                                                {item.category}
                                            </td>

                                            <td className="px-6 py-5">
                                                {item.desc}
                                            </td>

                                            <td className="px-6 py-5 text-right font-semibold">
                                                {item.amount}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                                    {item.status}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}