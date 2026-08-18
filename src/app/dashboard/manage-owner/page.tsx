"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { Pencil, Search, Trash2 } from "lucide-react";

interface Owner {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  nameBank: string;
  noBank: string;
  accountNumber: string;
  type: "Individual" | "Company";
  registerAt: string;
}

// const dummyOwners: Owner[] = [
//   {
//     id: 1,
//     name: "Budi Santoso",
//     email: "budi@gmail.com",
//     phone: "081234567890",
//     bank: "BCA",
//     accountNumber: "1234567890",
//     type: "Individual",
//     createdAt: "2026-07-01",
//   },
//   {
//     id: 2,
//     name: "PT Villa Indonesia",
//     email: "admin@villaindonesia.com",
//     phone: "081298765432",
//     bank: "Mandiri",
//     accountNumber: "9876543210",
//     type: "Company",
//     createdAt: "2026-07-03",
//   },
//   {
//     id: 3,
//     name: "Andi Wijaya",
//     email: "andi@gmail.com",
//     phone: "081377788899",
//     bank: "BRI",
//     accountNumber: "111222333",
//     type: "Individual",
//     createdAt: "2026-07-10",
//   },
// ];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // ==========================
  // FETCH OWNERS
  // ==========================

  const fetchOwners = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", "10");

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const result = await apiFetch(
        `/owner?${params.toString()}`
      );

      if (result.status) {
        setOwners(result.data ?? []);

        setPagination({
          page: result.meta?.page ?? 1,
          limit: result.meta?.limit ?? 10,
          total: result.meta?.total ?? 0,
          totalPage: result.meta?.totalPage ?? 1,
        });
      } else {
        setOwners([]);

        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 1,
        });
      }
    } catch (error) {
      console.error(
        "Gagal mengambil data owner:",
        error
      );

      setOwners([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FETCH
  // ==========================

  useEffect(() => {
    fetchOwners();
  }, [page, search]);

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
                  Kelola Owner
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola Pemilik Villa terdaftar di system
                </p>
              </div>

              <a href="/dashboard/manage-owner/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Owner
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
                placeholder="Cari nama, email, atau telepon..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="overflow-x-auto bg-white px-7 py-5 rounded-2xl">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200">

                    <th className="py-4 text-left text-gray-600">
                      Nama
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Email
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Telepon
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Bank & Rekening
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Daftar Tanggal
                    </th>

                    <th className="py-4 text-center text-gray-600">
                      Aksi
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {loading ? (

                    <tr>
                      <td
                        colSpan={6}
                        className="py-10"
                      >
                        <div className="flex items-center justify-center">

                          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#01085a]" />

                        </div>
                      </td>
                    </tr>

                  ) : owners.length === 0 ? (

                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data owner
                      </td>
                    </tr>

                  ) : (

                    owners.map((owner) => (

                      <tr
                        key={owner.id}
                        className="border-b border-gray-100"
                      >

                        {/* NAMA */}

                        <td className="py-4 font-medium">
                          {owner.fullname}
                        </td>

                        {/* EMAIL */}

                        <td className="py-4 font-medium">
                          {owner.email}
                        </td>

                        {/* TELEPON */}

                        <td className="py-4 font-medium">
                          {owner.phone || "-"}
                        </td>

                        {/* BANK */}

                        <td className="py-4 font-medium">

                          {owner.nameBank || "-"}
                          <br />

                          <span className="text-sm text-gray-500">
                            {owner.noBank || "-"}
                          </span>

                        </td>

                        {/* TANGGAL */}

                        <td className="py-4">

                          {owner.registerAt
                            ? new Date(
                                owner.registerAt
                              ).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "-"}

                        </td>

                        {/* AKSI */}

                        <td className="py-4">

                          <div className="flex justify-center items-center gap-2">

                            <a
                              href={`/dashboard/manage-owner/edit/${owner.id}`}
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

              {/* ==========================
                  PAGINATION
              ========================== */}

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

                  {/* SEBELUMNYA */}

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

                  {/* NOMOR HALAMAN */}

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

                  {/* BERIKUTNYA */}

                  <button
                    disabled={
                      pagination.page >=
                      pagination.totalPage
                    }
                    onClick={() =>
                      setPage((prev) =>
                        prev + 1
                      )
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