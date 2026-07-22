"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";

export default function UserManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState<any[]>([]);
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

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const token = Cookies.get(
          "access_token"
        );

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/user?page=${page}&limit=10&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        if (result.status) {
          setUsers(result.data);
          setPagination(result.pagination);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchUsers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // FILTER SEARCH
  const filteredUsers = users.filter((user) =>
    user.username
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      ?.toLowerCase()
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

          <div className="bg-white rounded-3xl p-6 border border-gray-200">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Management User
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola data user aplikasi
                </p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
                + Tambah User
              </button>

            </div>

            {/* SEARCH */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Cari user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200">

                    <th className="py-4 text-left text-gray-600">
                      Username
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Email
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Role
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Created
                    </th>

                    <th className="py-4 text-center text-gray-600">
                      Aksi
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="flex h-40 items-center justify-center">
                          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-[#01085a]"></div>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 font-medium">
                          {user.username}
                        </td>

                        <td>{user.email}</td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          {new Date(
                            user.created_at
                          ).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>

                        <td>
                          <div className="flex justify-center gap-2">
                            <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                              Edit
                            </button>

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

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}