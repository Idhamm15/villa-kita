"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";

interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  bank: string;
  accountNumber: string;
  type: "Individual" | "Company";
  createdAt: string;
}

const dummyOwners: Owner[] = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@gmail.com",
    phone: "081234567890",
    bank: "BCA",
    accountNumber: "1234567890",
    type: "Individual",
    createdAt: "2026-07-01",
  },
  {
    id: 2,
    name: "PT Villa Indonesia",
    email: "admin@villaindonesia.com",
    phone: "081298765432",
    bank: "Mandiri",
    accountNumber: "9876543210",
    type: "Company",
    createdAt: "2026-07-03",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    email: "andi@gmail.com",
    phone: "081377788899",
    bank: "BRI",
    accountNumber: "111222333",
    type: "Individual",
    createdAt: "2026-07-10",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
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

    const fetchOwners = async () => {
    try {
        setLoading(true);

        // TODO:
        // const result = await apiFetch(`/owner?page=${page}&limit=10`);
        // if(result.status){
        //   setOwners(result.data);
        //   setPagination(result.pagination);
        // }

        await new Promise((resolve) => setTimeout(resolve, 500));

        setOwners(dummyOwners);

        setPagination({
        current_page: 1,
        per_page: 10,
        total_data: dummyOwners.length,
        total_pages: 1,
        has_next_page: false,
        has_prev_page: false,
        });
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    fetchOwners();
  }, [page]);

    const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(search.toLowerCase())
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
                  Kelola Owner
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola Pemilik Villa terdaftar di system
                </p>
              </div>

              <a href="/dashboard/management-blog/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Owner
              </a>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto bg-white px-7 py-5 rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-gray-600">Nama</th>
                    <th className="py-4 text-left text-gray-600">Email</th>
                    <th className="py-4 text-left text-gray-600">Telepon</th>
                    <th className="py-4 text-left text-gray-600">Bank & Rekening</th>
                    <th className="py-4 text-left text-gray-600">Tipe</th>
                    <th className="py-4 text-left text-gray-600">Daftar Tanggal</th>
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
                  ) : filteredOwners.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    filteredOwners.map((owner) => (
                      <tr
                        key={owner.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 font-medium">
                          {owner.name}
                        </td>
                        
                        <td className="py-4 font-medium">
                          {owner.email}
                        </td>
                        <td className="py-4 font-medium">
                          {owner.phone}
                        </td>
                        <td className="py-4 font-medium">
                          {owner.bank} <br />  {owner.accountNumber}
                        </td>
                        <td className="py-4 font-medium">
                          {owner.type}
                        </td>

                        <td>
                          {new Date(owner.createdAt).toLocaleDateString(
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

          </div>

        </div>
      </main>
    </div>
  );
}