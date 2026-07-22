"use client"

import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryProduct {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const result = await apiFetch(
        `/category-products?page=${page}&limit=10`
      );

      if (result.status) {
        setCategories(result.data);
        setPagination(result.meta);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* Sidebar */}
      <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* Header */}
        <NavbarDashboard
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <div className="bg-gray-100 rounded-3xl p-6">

          <div className="bg-gray-100 rounded-3xl p-6 border-gray-200">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Kategori Produk
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola Kategori Properti/Produk
                </p>
              </div>

              <a href="/dashboard/management-blog/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Kategori
              </a>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Cari Kategori..."
                className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto bg-white px-7 py-5 rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-600">Nama</th>
                    <th className="py-4 text-center text-gray-600">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-10">
                        <div className="flex items-center justify-center">
                          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#01085a]"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 font-medium">
                          {category.name}
                        </td>

                        <td>
                        <div className="flex justify-center items-center gap-2">
                            <a
                            href={`/dashboard/manage-owner/edit/${category.id}`}
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                            title="Edit Owner"
                            >
                            <Pencil size={18} />
                            </a>

                            <button
                            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                            title="Hapus Owner"
                            >
                            <Trash2 size={18} />
                            </button>
                        </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                <div className="text-sm text-gray-500">
                  Menampilkan halaman <b>{pagination.page}</b> dari{" "}
                  <b>{pagination.totalPages}</b>
                  <span className="ml-2">
                    ({pagination.total} data)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          page === i + 1
                            ? "bg-blue-600 text-white"
                            : "border hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}

                  <button
                    disabled={page === pagination.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>


            </div>

          </div>

        </div>
      </main>
    </div>
  );
}