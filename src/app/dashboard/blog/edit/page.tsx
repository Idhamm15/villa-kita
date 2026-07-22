"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartColumn,
  faChevronUp,
  faCircleExclamation,
  faDollarSign,
  faDownload,
  faEye,
  faFileLines,
  faGlobe,
  faUsers,
  faXmark,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";

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

            <h1>Edit Blog</h1>
        </div>
        </div>
      </main>
    </div>
  );
}