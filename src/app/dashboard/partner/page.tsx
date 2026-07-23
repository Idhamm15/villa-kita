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
                  Kelola Partner
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola Pemilik Villa terdaftar di system
                </p>
              </div>

              <a href="/dashboard/partner/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah Partner
              </a>
            </div>

            {/* partner */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex h-40 items-center justify-center bg-gray-100">
                    <div className="h-24 w-24 rounded bg-gray-300" />
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="h-5 w-32 rounded bg-gray-300" />

                    <div className="flex gap-2">
                      <div className="h-10 flex-1 rounded bg-gray-200" />
                      <div className="h-10 w-14 rounded bg-gray-200" />
                      <div className="h-10 w-16 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))
            ) : filteredOwners.length === 0 ? (
              <div className="col-span-full rounded-2xl bg-white p-10 text-center shadow">
                <p className="text-gray-500">
                  Data owner tidak ditemukan.
                </p>
              </div>
            ) : (
              filteredOwners.map((owner) => (
                <div
                  key={owner.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Badge */}
                  <div className="relative flex h-40 items-center justify-center bg-gray-50">
                    <span className="absolute right-3 top-3 rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Aktif
                    </span>

                    <img
                      src="https://placehold.co/120x120/png"
                      alt={owner.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className="truncate text-lg font-semibold">
                      {owner.name}
                    </h3>

                    <div className="mt-5 flex gap-2">
                      <button
                        className="flex-1 rounded-lg bg-gray-100 py-2 text-sm font-medium transition hover:bg-yellow-100"
                        onClick={() =>
                          Swal.fire(
                            "Info",
                            "Fitur aktif/nonaktif belum dibuat.",
                            "info"
                          )
                        }
                      >
                        Nonaktifkan
                      </button>

                      <button
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                        onClick={() =>
                          (window.location.href = `/dashboard/partner/edit/${owner.id}`)
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                        onClick={() =>
                          Swal.fire({
                            title: "Hapus Owner?",
                            text: "Data owner akan dihapus.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#ef4444",
                            cancelButtonColor: "#6b7280",
                            confirmButtonText: "Ya, Hapus",
                          })
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          </div>

        </div>
      </main>
    </div>
  );
}