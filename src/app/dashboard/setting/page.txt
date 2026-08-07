"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import InMaintenance from "@/component/InMaintenance";
import { Settings } from "lucide-react";


interface Blog {
  id: number;
  user_id: number;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string;
  thumbnail_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_data: 0,
    total_pages: 1,
    has_next_page: false,
    has_prev_page: false,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const result = await apiFetch(
        `/blog?page=${page}&limit=10`
      );

      if (result.status) {
        setBlogs(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      .toLowerCase()
      .includes(search.toLowerCase())
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

        <InMaintenance
          icon={Settings}
          title="Pengaturan Umum"
          description="Fitur pengaturan sedang dalam pengembangan."
        />

          {/* <div className="bg-white rounded-3xl p-6 border border-gray-200">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pengaturan
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola artikel website perusahaan
                </p>
              </div>

              <a href="/dashboard/management-blog/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Artikel
              </a>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-600">Judul</th>
                    <th className="py-4 text-left text-gray-600">Penulis</th>
                    <th className="py-4 text-left text-gray-600">Status</th>
                    <th className="py-4 text-left text-gray-600">Tanggal</th>
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
                  ) : filteredBlogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((blog) => (
                      <tr
                        key={blog.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 font-medium">
                          {blog.title}
                        </td>

                        <td>Admin</td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              blog.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>

                        <td>
                          {new Date(blog.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td>
                          <div className="flex justify-center gap-2">
                            <a
                              href={`/dashboard/management-blog/edit/${blog.slug}`}
                              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
                            >
                              Edit
                            </a>

                            <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg">
                              Delete
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
                  Menampilkan halaman {pagination.current_page} dari{" "}
                  {pagination.total_pages}
                  <span className="ml-2">
                    ({pagination.total_data} data)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!pagination.has_prev_page}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50"
                  >
                    Sebelumnya
                  </button>

                  {Array.from(
                    { length: pagination.total_pages },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          page === i + 1
                            ? "bg-blue-600 text-white"
                            : "border"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}

                  <button
                    disabled={!pagination.has_next_page}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50"
                  >
                    Berikutnya
                  </button>
                </div>

              </div>


            </div>

          </div> */}

        </div>
      </main>
    </div>
  );
}