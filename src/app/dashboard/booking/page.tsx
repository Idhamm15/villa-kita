"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { FetchBooking } from "@/lib/querry/booking.query";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [booking, setBooking] = useState<FetchBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // ==========================
  // FETCH BOOKINGS
  // ==========================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", "10");

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (status) {
        params.append("status", status);
      }

      const result = await apiFetch(
        `/bookings?${params.toString()}`
      );

      if (result.status) {
        setBooking(result.data ?? []);

        setPagination({
          page: result.meta?.page ?? 1,
          limit: result.meta?.limit ?? 10,
          total: result.meta?.total ?? 0,
          totalPage: result.meta?.totalPage ?? 1,
        });
      } else {
        setBooking([]);

        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 1,
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data booking:", error);

      setBooking([]);

      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FETCH
  // ==========================

  useEffect(() => {
    fetchBookings();
  }, [page, status, search]);

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);

    // kembali ke halaman pertama
    if (page !== 1) {
      setPage(1);
    }
  };

  // ==========================
  // STATUS
  // ==========================

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(e.target.value);

    // kembali ke halaman pertama
    if (page !== 1) {
      setPage(1);
    }
  };

  // ==========================
  // STATUS BADGE
  // ==========================

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "EXPIRED":
        return "bg-gray-100 text-gray-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================
  // PAYMENT BADGE
  // ==========================

  const getPaymentClass = (
    paymentStatus: string
  ) => {
    switch (paymentStatus) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "EXPIRED":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ==========================
          SIDEBAR
      ========================== */}

      <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* ==========================
          MAIN
      ========================== */}

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        <NavbarDashboard
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="bg-gray-100 rounded-3xl p-6">

          <div className="bg-gray-100 rounded-3xl p-6">

            {/* ==========================
                HEADER
            ========================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Kelola Booking
                </h1>

                <p className="text-gray-500 mt-1">
                  Kelola seluruh data booking pelanggan
                </p>
              </div>

            </div>

            {/* ==========================
                FILTER
            ========================== */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

              <div className="grid gap-4 md:grid-cols-2">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Cari booking, tamu, email, atau properti..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* STATUS */}

                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Semua Status
                  </option>

                  <option value="PENDING">
                    Pending
                  </option>

                  <option value="PAID">
                    Paid
                  </option>

                  <option value="CANCELLED">
                    Cancelled
                  </option>

                  <option value="EXPIRED">
                    Expired
                  </option>

                  <option value="FAILED">
                    Failed
                  </option>
                </select>

              </div>

            </div>

            {/* ==========================
                TABLE
            ========================== */}

            <div className="overflow-x-auto bg-white px-7 py-5 rounded-2xl">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200">

                    <th className="py-4 text-left text-gray-600">
                      Tamu
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Properti
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Check In / Check Out
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Total
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Status
                    </th>

                    <th className="py-4 text-left text-gray-600">
                      Payment
                    </th>

                    <th className="py-4 text-center text-gray-600">
                      Aksi
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {/* LOADING */}

                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10"
                      >
                        <div className="flex items-center justify-center">

                          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#01085a]" />

                        </div>
                      </td>
                    </tr>
                  ) : booking.length === 0 ? (

                    /* EMPTY */

                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-gray-500"
                      >
                        Tidak ada data booking
                      </td>
                    </tr>

                  ) : (

                    /* DATA */

                    booking.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b border-gray-100"
                      >

                        {/* TAMU */}

                        <td className="py-4">

                          <div className="font-medium text-gray-900">
                            {item.nameGuest}
                          </div>

                          <div className="text-sm text-gray-500">
                            {item.user?.email ?? "-"}
                          </div>

                        </td>

                        {/* PROPERTI */}

                        <td className="py-4">

                          <div className="font-medium text-gray-900">
                            {item.product?.name ?? "-"}
                          </div>

                          <div className="text-sm text-gray-500">
                            {item.product?.location ?? "-"}
                          </div>

                        </td>

                        {/* CHECKIN CHECKOUT */}

                        <td className="py-4">

                          <div className="text-sm">

                            <div>
                              {item.checkIn
                                ? new Date(
                                    item.checkIn
                                  ).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}
                            </div>

                            <div className="text-gray-500">
                              {item.checkOut
                                ? new Date(
                                    item.checkOut
                                  ).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}
                            </div>

                          </div>

                        </td>

                        {/* TOTAL */}

                        <td className="py-4 font-medium">

                          Rp{" "}
                          {Number(
                            item.totalPrice ?? 0
                          ).toLocaleString("id-ID")}

                        </td>

                        {/* STATUS */}

                        <td className="py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </td>

                        {/* PAYMENT */}

                        <td className="py-4">

                          <span
                            className='inline-flex rounded-full px-3 py-1 text-xs font-medium'
                          >
                            {item.paymentMethod}
                          </span>

                        </td>

                        {/* AKSI */}

                        <td className="py-4">

                          <div className="flex justify-center items-center gap-2">

                            <a
                              href={`/dashboard/booking/${item.id}`}
                              className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                              title="Lihat Booking"
                            >
                              <Eye size={18} />
                            </a>

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

                  {/* PREVIOUS */}

                  <button
                    disabled={
                      pagination.page <= 1
                    }
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>

                  {/* PAGE */}

                  {Array.from(
                    {
                      length:
                        pagination.totalPage,
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

                  {/* NEXT */}

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