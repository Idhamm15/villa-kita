"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Home,
  CircleDollarSign,
  Activity,
  Clock3,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { FetchBooking } from "@/lib/querry/booking.query";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-3xl p-6 shadow-lg text-white ${gradient}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/90">
            {title}
          </p>
        </div>

        <div className="rounded-xl bg-white/20 p-3">
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-bold">
          {value}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-white/90">
          <TrendingUp size={15} />
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [latestBookings, setLatestBookings] = useState<
    FetchBooking[]
  >([]);

  const [loadingBookings, setLoadingBookings] =
    useState(true);

  const [statistics, setStatistics] =
    useState<any>(null);

  const fetchStatistics = async () => {
    try {
      const result = await apiFetch(
        "/statistics"
      );

      if (result.status) {
        setStatistics(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLatestBookings = async () => {
    try {
      setLoadingBookings(true);

      const result = await apiFetch(
        "/bookings/latest"
      );

      if (result.status) {
        setLatestBookings(result.data ?? []);
      } else {
        setLatestBookings([]);
      }
    } catch (error) {
      console.error(
        "Gagal mengambil booking terbaru:",
        error
      );

      setLatestBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchLatestBookings();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
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

        <div className="space-y-8 rounded-3xl bg-gray-100 p-6">
          {/* Header */}
          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              Selamat datang kembali, Super Admin
            </p>
          </div>

          {/* Statistik */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Booking"
              value={
                statistics?.totalBooking?.value ?? 0
              }
              subtitle={`${
                statistics?.totalBooking?.percentage ?? 0
              }% dari bulan lalu`}
              icon={Calendar}
              gradient="bg-gradient-to-r from-blue-500 to-blue-700"
            />

            <StatCard
              title="Total Owner"
              value={
                statistics?.totalOwner?.value ?? 0
              }
              subtitle={`${
                statistics?.totalOwner?.percentage ?? 0
              }% dari bulan lalu`}
              icon={Users}
              gradient="bg-gradient-to-r from-emerald-500 to-emerald-600"
            />

            <StatCard
              title="Total Properti"
              value={
                statistics?.totalProperty?.value ?? 0
              }
              subtitle={`${
                statistics?.totalProperty?.percentage ?? 0
              }% dari bulan lalu`}
              icon={Home}
              gradient="bg-gradient-to-r from-violet-500 to-fuchsia-600"
            />

            <StatCard
              title="Total Revenue"
              value={`Rp ${Number(
                statistics?.totalRevenue?.value ?? 0
              ).toLocaleString("id-ID")}`}
              subtitle={`${
                statistics?.totalRevenue?.percentage ?? 0
              }% dari bulan lalu`}
              icon={CircleDollarSign}
              gradient="bg-gradient-to-r from-orange-500 to-orange-600"
            />

          </div>

          {/* Bottom */}
          <div className="grid gap-6 xl:grid-cols">
            {/* Booking */}
            <div className="w-full overflow-x-auto">
          
              {loadingBookings ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                </div>
              ) : latestBookings.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                  <Clock3
                    size={60}
                    strokeWidth={1.5}
                  />

                  <p className="mt-4">
                    Belum ada booking
                  </p>
                </div>
              ) : (
                
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Booking
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Tamu
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Properti
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Check-in / Check-out
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {latestBookings.map((booking) => (

                      <tr
                        key={booking.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >

                        {/* BOOKING */}

                        <td className="px-6 py-5">

                          <div className="font-semibold text-gray-900">
                            {booking.bookingCode}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            {new Date(
                              booking.createdAt
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>

                        </td>

                        {/* TAMU */}

                        <td className="px-6 py-5">

                          <div className="font-medium text-gray-900">
                            {booking.nameGuest}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            {booking.user?.email ?? "-"}
                          </div>

                        </td>

                        {/* PROPERTI */}

                        <td className="px-6 py-5">

                          <div className="font-medium text-gray-900">
                            {booking.product?.name ?? "-"}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            {booking.product?.location ?? "-"}
                          </div>

                        </td>

                        {/* CHECK IN / CHECK OUT */}

                        <td className="px-6 py-5">

                          <div className="text-sm font-medium text-gray-900">
                            {new Date(
                              booking.checkIn
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>

                          <div className="mt-1 text-sm text-gray-500">
                            s/d{" "}
                            {new Date(
                              booking.checkOut
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            {booking.totalGuest} tamu
                          </div>

                        </td>

                        {/* TOTAL */}

                        <td className="px-6 py-5">

                          <div className="font-semibold text-gray-900">
                            Rp{" "}
                            {Number(
                              booking.totalPrice
                            ).toLocaleString("id-ID")}
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {booking.paymentMethod ?? "-"}
                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              booking.status === "PAID"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "CANCELLED"
                                ? "bg-red-100 text-red-700"
                                : booking.status === "EXPIRED"
                                ? "bg-gray-100 text-gray-700"
                                : booking.status === "FAILED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {booking.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}