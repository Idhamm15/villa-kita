"use client";

import { useState } from "react";

import {
  DollarSign,
  Users,
  Eye,
  TrendingUp,
  LucideIcon,
  Icon,
} from "lucide-react";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  bg,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  bg: string;
}) {
  return (
    <div className="rounded-3xl bg-gray-100 p-3">
      <h3 className="mb-4 px-2 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <div className="rounded-3xl bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-extrabold text-slate-900">
              {value}
            </p>

            <p className="mt-1 text-sm text-green-600">
              {subtitle}
            </p>
          </div>

          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${bg}`}
          >
            <Icon size={30} className="text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="bg-gray-100 rounded-3xl p-10 text-center">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Total Revenue"
            value="$127K"
            subtitle="+23% vs last month"
            icon={DollarSign}
            bg="bg-lime-300"
          />

          <StatCard
            title="Active Users"
            value="24.7K"
            subtitle="+12% this week"
            icon={Users}
            bg="bg-cyan-300"
          />

          <StatCard
            title="Page Views"
            value="89.2K"
            subtitle="+5% today"
            icon={Eye}
            bg="bg-orange-300"
          />

          <StatCard
            title="Conversion Rate"
            value="3.8%"
            subtitle="-2% vs target"
            icon={TrendingUp}
            bg="bg-lime-300"
          />
        </div>
        </div>
      </main>
    </div>
  );
}