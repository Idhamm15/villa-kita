"use client";

import { useState } from "react";
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
        <h2 className="text-5xl font-bold">
          {value}
        </h2>

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
              value="28"
              subtitle="+12% dari bulan lalu"
              icon={Calendar}
              gradient="bg-gradient-to-r from-blue-500 to-blue-700"
            />

            <StatCard
              title="Total Owner"
              value="3"
              subtitle="+5% dari bulan lalu"
              icon={Users}
              gradient="bg-gradient-to-r from-emerald-500 to-emerald-600"
            />

            <StatCard
              title="Total Properti"
              value="3"
              subtitle="+8% dari bulan lalu"
              icon={Home}
              gradient="bg-gradient-to-r from-violet-500 to-fuchsia-600"
            />

            <StatCard
              title="Total Revenue"
              value="Rp 0"
              subtitle="+15% dari bulan lalu"
              icon={CircleDollarSign}
              gradient="bg-gradient-to-r from-orange-500 to-orange-600"
            />
          </div>

          {/* Bottom */}
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Booking */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-5 text-white">
                <div className="rounded-xl bg-white/20 p-3">
                  <Calendar size={22} />
                </div>

                <h2 className="text-2xl font-bold">
                  Booking Terbaru
                </h2>
              </div>

              <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                <Clock3 size={60} strokeWidth={1.5} />

                <p className="mt-4">
                  Data booking akan ditampilkan di sini
                </p>
              </div>
            </div>

            {/* Activity */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="flex items-center gap-4 bg-gradient-to-r from-violet-500 to-fuchsia-600 px-6 py-5 text-white">
                <div className="rounded-xl bg-white/20 p-3">
                  <Activity size={22} />
                </div>

                <h2 className="text-2xl font-bold">
                  Aktivitas Terbaru
                </h2>
              </div>

              <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                <Clock3 size={60} strokeWidth={1.5} />

                <p className="mt-4">
                  Log aktivitas akan ditampilkan di sini
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}