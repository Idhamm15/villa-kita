"use client";

import { useState } from "react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { ArrowLeft, FolderOpen, ImagePlus, Plus, Upload } from "lucide-react";

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

            <h1 className="text-3xl font-bold text-gray-900">
            Tambah Properti Baru
            </h1>

            <p className="mt-2 text-gray-500">
            Tambahkan properti baru untuk ditampilkan pada homepage.
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
                Informasi Properti
                </h2>

                <p className="mt-1 text-blue-100">
                Lengkapi informasi properti di bawah ini.
                </p>

            </div>

            </div>

        </div>

        {/* ===== FORM ===== */}
        <form className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">

            <div className="bg-white">
                {/* Header Form */}
                <div className="border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-1 rounded-full bg-blue-600" />

                        <div>
                            <h2 className="text-2xl font-bold">
                                Informasi Kategori
                            </h2>
                            <p className="text-gray-500">
                                Lengkapi informasi kategori di bawah ini.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 p-8">

                    {/* ================= Informasi Dasar ================= */}

                    <div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Nama Properti */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Nama Properti *
                                </label>

                                <input
                                    type="text"
                                    placeholder="Masukkan nama properti"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            {/* Tipe Properti */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Tipe Properti *
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none">
                                    <option>Hotel</option>
                                    <option>Villa</option>
                                    <option>Apartment</option>
                                    <option>Guest House</option>
                                </select>
                            </div>

                            {/* Lokasi */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Lokasi *
                                </label>

                                <input
                                    type="text"
                                    placeholder="Contoh: Bandung, Jawa Barat"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Alamat (Opsional)
                                </label>

                                <input
                                    type="text"
                                    placeholder="Contoh: Jl. Merdeka No.123"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                        </div>

                        {/* URL Google Maps */}
                        <div className="mt-6">
                            <label className="mb-2 block font-semibold">
                                URL Google Maps
                            </label>

                            <input
                                type="text"
                                placeholder="https://maps.app.goo.gl/xxxxx"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />

                            <p className="mt-2 text-sm text-gray-500">
                                Buka Google Maps → cari lokasi → klik "Bagikan" → salin link
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Booking */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Tipe Booking *
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none">
                                    <option>Menginap</option>
                                    <option>Harian</option>
                                </select>
                            </div>

                            {/* Owner */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Pemilik Properti *
                                </label>

                                <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none">
                                    <option>Pilih Pemilik</option>
                                </select>
                            </div>

                            {/* Kamar Tidur */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Jumlah Kamar Tidur
                                </label>

                                <input
                                    type="number"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            {/* Kamar Mandi */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Jumlah Kamar Mandi
                                </label>

                                <input
                                    type="number"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            {/* Max Tamu */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Max Tamu *
                                </label>

                                <input
                                    type="number"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            {/* Luas */}
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Luas (m²)
                                </label>

                                <input
                                    type="number"
                                    placeholder="Contoh: 45"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* ================= Harga ================= */}

                    <div>

                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-7 w-1 rounded-full bg-emerald-500" />
                            <h2 className="text-2xl font-bold">
                                Harga
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Harga Awal (Opsional)
                                </label>

                                <input
                                    type="number"
                                    placeholder="Harga sebelum diskon"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Harga Akhir *
                                </label>

                                <input
                                    type="number"
                                    placeholder="Harga utama"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                        </div>

                    </div>

                    <hr className="border-gray-200" />

                    {/* ================= Deskripsi ================= */}

                    <div>

                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-7 w-1 rounded-full bg-purple-600" />
                            <h2 className="text-2xl font-bold">
                                Deskripsi
                            </h2>
                        </div>

                        <textarea
                            rows={6}
                            placeholder="Deskripsi singkat tentang properti..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                        />

                    </div>

                </div>
            </div>

            {/* ================= Upload Gambar ================= */}

            <div className="bg-white mt-20">
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                                <ImagePlus className="h-7 w-7 text-white" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Upload Gambar Properti
                                </h2>

                                <p className="mt-1 text-blue-100">
                                    Upload foto properti dengan kualitas terbaik.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Body */}
                    <div className="p-8">

                        <label
                            htmlFor="images"
                            className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50"
                        >

                            <FolderOpen
                                size={52}
                                className="mb-4 text-yellow-400"
                            />

                            <h3 className="text-lg font-semibold text-gray-800">
                                Drag & Drop gambar di sini
                            </h3>

                            <p className="mt-1 text-gray-500">
                                atau klik tombol di bawah untuk memilih gambar
                            </p>

                            <p className="mt-2 text-sm text-gray-400">
                                JPEG, PNG, WEBP, HEIC • Maks 10MB / file • Maks 12 gambar
                            </p>

                            <div className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                                <span className="flex items-center gap-2">
                                    <Upload size={18} />
                                    Pilih Gambar
                                </span>
                            </div>

                            <input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                            />

                        </label>

                        {/* Tips */}

                        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-700">

                            <span className="font-semibold">
                                💡 Tips:
                            </span>{" "}
                            Gambar pertama akan menjadi <b>cover/thumbnail</b>. Anda bisa
                            mengubahnya nanti dengan memilih gambar lainnya.

                        </div>

                    </div>

                </div>
            </div>

            {/* ================= DETAIL PROPERTI ================= */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mt-20">

                {/* Header */}
                <div className="border-b border-gray-200 bg-blue-600  px-8 py-6">
                    <h2 className="text-2xl font-bold text-white">
                        Detail Properti
                    </h2>

                    <p className="mt-1 text-gray-100">
                        Lengkapi informasi detail untuk properti Anda.
                    </p>
                </div>

                <div className="space-y-8 p-8">

                    {/* ================= Tipe Unit ================= */}

                    <div>

                        <label className="mb-2 block font-semibold">
                            Tipe Unit
                        </label>

                        <input
                            type="text"
                            placeholder="Contoh: Deluxe Room, Suite, Villa Eksklusif"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                        />

                        <p className="mt-2 text-sm text-gray-500">
                            Nama tipe spesifik unit ini.
                        </p>

                    </div>

                    {/* ================= Fasilitas ================= */}

                    <div>

                        <h3 className="mb-4 text-lg font-bold">
                            Fasilitas
                        </h3>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            {[
                                "AC",
                                "TV",
                                "WiFi",
                                "Kamar Mandi Pribadi",
                                "Air Panas",
                                "Kolam Renang",
                                "Gym",
                                "Parkir",
                                "Dapur",
                                "Kulkas",
                                "Mesin Cuci",
                                "Balkon",
                                "Mini Bar",
                                "Brankas",
                                "Hairdryer",
                                "Sofa",
                                "Meja Kerja",
                                "Lemari Pakaian",
                                "Teko Listrik",
                                "Cermin",
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <input type="checkbox" />
                                    <span>{item}</span>
                                </label>
                            ))}

                        </div>

                        <div className="mt-6 flex gap-3">

                            <input
                                type="text"
                                placeholder="Masukkan item baru"
                                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />

                            <button
                                type="button"
                                className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"
                            >
                                Tambah
                            </button>

                        </div>

                    </div>

                    <hr />

                    {/* ================= Harga Sudah Termasuk ================= */}

                    <div>

                        <h3 className="mb-4 text-lg font-bold">
                            Harga Sudah Termasuk
                        </h3>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            {[
                                "Sarapan",
                                "Makan Siang",
                                "Makan Malam",
                                "Layanan Kamar",
                                "Resepsionis 24 Jam",
                                "Welcome Drink",
                                "Handuk & Toiletries",
                                "Akses Kolam Renang",
                                "Akses Gym",
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <input type="checkbox" />
                                    <span>{item}</span>
                                </label>
                            ))}

                        </div>

                        <div className="mt-6 flex gap-3">

                            <input
                                type="text"
                                placeholder="Masukkan item baru"
                                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />

                            <button
                                type="button"
                                className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"
                            >
                                Tambah
                            </button>

                        </div>

                    </div>

                    <hr />

                    {/* ================= Harga Belum Termasuk ================= */}

                    <div>

                        <h3 className="mb-4 text-lg font-bold">
                            Harga Belum Termasuk
                        </h3>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            {[
                                "Transportasi",
                                "Laundry",
                                "Spa & Pijat",
                                "Minibar Tambahan",
                                "Telepon Internasional",
                                "Parkir Berbayar",
                                "Aktivitas Tambahan",
                                "Pemandu Wisata",
                                "Foto Profesional",
                                "Souvenir",
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <input type="checkbox" />
                                    <span>{item}</span>
                                </label>
                            ))}

                        </div>

                        <div className="mt-6 flex gap-3">

                            <input
                                type="text"
                                placeholder="Masukkan item baru"
                                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
                            />

                            <button
                                type="button"
                                className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"
                            >
                                Tambah
                            </button>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-4 border-t border-gray-200 bg-gray-50 p-8 md:flex-row md:justify-between">

                    <button
                        type="button"
                        className="rounded-xl border border-gray-300 px-10 py-3 font-semibold hover:bg-gray-100"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-3 font-semibold text-white hover:opacity-90"
                    >
                        ✓ Simpan Properti
                    </button>

                </div>

            </div>


        </form>

        </div>

    </main>

    </div>
  );
}