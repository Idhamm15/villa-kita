 // app/components/dashboard/Header.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDownload,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function NavbarDashboard({
  onOpenSidebar,
}: HeaderProps) {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-gray-100 rounded-3xl p-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <h1 className="font-bold text-lg">
          Analytics Hub
        </h1>

        <div className="w-10" />
      </div>

      {/* Desktop Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Comprehensive data insights and performance metrics
          </p>
        </div>

        <div className="flex gap-3">

          <a href="/" className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl transition">
            Kembali ke Website
          </a>
        </div>
      </div>
    </>
  );
}