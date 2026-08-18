"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { Pencil, Search, Trash2 } from "lucide-react";

interface FetchBlogs {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<FetchBlogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isPublished, setIsPublished] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // ==========================
  // FETCH BLOGS
  // ==========================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", "10");

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (isPublished !== "") {
        params.append("isPublished", isPublished);
      }

      const result = await apiFetch(
        `/blogs?${params.toString()}`
      );

      if (result.status) {
        setBlogs(result.data ?? []);

        setPagination({
          page: result.meta?.page ?? 1,
          limit: result.meta?.limit ?? 10,
          total: result.meta?.total ?? 0,
          totalPage: result.meta?.totalPage ?? 1,
        });
      } else {
        setBlogs([]);

        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 1,
        });
      }
    } catch (error) {
      console.error(
        "Gagal mengambil data blog:",
        error
      );

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FETCH
  // ==========================

  useEffect(() => {
    fetchBlogs();
  }, [page, search, isPublished]);

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);

    if (page !== 1) {
      setPage(1);
    }
  };

  // ==========================
  // PUBLISHED FILTER
  // ==========================

  const handlePublishedChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsPublished(e.target.value);

    if (page !== 1) {
      setPage(1);
    }
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
                  Kelola Blog
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola Pemilik Villa terdaftar di system
                </p>
              </div>

              <a href="/dashboard/blog/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Blog
              </a>
            </div>

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Cari blog..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={isPublished}
              onChange={handlePublishedChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Semua Status</option>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>

            <div className="overflow-x-auto bg-white px-7 py-5 rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-600">Judul</th>
                    <th className="py-4 text-left text-gray-600">Penulis</th>
                    <th className="py-4 text-left text-gray-600">Status</th>
                    <th className="py-4 text-left text-gray-600">Terakhir Update</th>
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
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blogs) => (
                      <tr
                        key={blogs.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 font-medium">
                          {blogs.title}
                        </td>
                        
                        <td className="py-4 font-medium">
                          {blogs.content}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              blogs.isPublished
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {blogs.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td>
                          {new Date(blogs.updatedAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td>
                        <div className="flex justify-center items-center gap-2">
                            <a
                            href={`/dashboard/blog/edit/${blogs.id}`}
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
                  Menampilkan halaman{" "}
                  {pagination.page} dari{" "}
                  {pagination.totalPage}

                  <span className="ml-2">
                    ({pagination.total} data)
                  </span>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    disabled={pagination.page <= 1}
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>

                  {Array.from(
                    {
                      length: pagination.totalPage,
                    },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        setPage(pageNumber)
                      }
                      className={`px-4 py-2 rounded-lg ${
                        page === pageNumber
                          ? "bg-blue-600 text-white"
                          : "border"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    disabled={
                      pagination.page >=
                      pagination.totalPage
                    }
                    onClick={() =>
                      setPage((prev) => prev + 1)
                    }
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