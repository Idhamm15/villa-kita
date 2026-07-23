"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Settings,
  LogOut,
  X,
  LucideIcon,
  FolderKanban,
  House,
  ShoppingCart,
  FileText,
} from "lucide-react";

interface NavbarProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

export default function HeaderDashboard({
  sidebarOpen,
  onCloseSidebar,
}: NavbarProps) {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.removeItem("user");

    window.location.replace("/login");
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-gray-100 transition-transform duration-300 lg:static ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <img src="/img/logo.png" alt="Logo" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Villa Kita
                </h1>

                <p className="text-xs text-slate-500">
                  Dashboard
                </p>
              </div>
            </div>

            <button
              onClick={onCloseSidebar}
              className="rounded-lg p-2 hover:bg-gray-200 lg:hidden"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
          {/* Analytics */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Analytics
            </h3>

           <div className="space-y-1">
            <SidebarButton
              link="/dashboard"
              icon={LayoutDashboard}
              label="Overview"
            />

            <SidebarButton
              link="/dashboard/manage-owner"
              icon={ShoppingCart}
              label="Kelola Owner"
            />
            <SidebarButton
              link="/dashboard/category-product"
              icon={FolderKanban}
              label="Kategori Properti"
            />
            <SidebarButton
              link="/dashboard/product"
              icon={House}
              label="Kelola Properti"
            />

            <SidebarButton
              link="/dashboard/booking"
              icon={ShoppingCart}
              label="Booking"
            />

            <SidebarButton
              link="/dashboard/blog"
              icon={Newspaper}
              label="Blog"
            />

            <SidebarButton
              link="/dashboard/voucher"
              icon={Newspaper}
              label="Voucher"
            />

            <SidebarButton
              link="/dashboard/partner"
              icon={Users}
              label="Partner"
            />

            <SidebarButton
              link="/dashboard/management-user"
              icon={Users}
              label="Kelola Pengguna"
            />
          </div>
          </div>

          {/* Reports */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Reports
            </h3>

            <div className="space-y-1">
              <SidebarButton
                link="/dashboard/report"
                icon={FileText}
                label="Laporan"
              />

              <SidebarButton
                link="/dashboard/setting"
                icon={Settings}
                label="Pengaturan"
              />
            </div>

            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Profile */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-slate-900">
                Admin
              </p>

              <p className="text-sm text-slate-500">
                admin@satujutuh.net
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface SidebarButtonProps {
  link: string;
  icon: LucideIcon;
  label: string;
}

function SidebarButton({
  link,
  icon: Icon,
  label,
}: SidebarButtonProps) {
  const pathname = usePathname();

  const active =
    link === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(link);

  return (
    <Link
      href={link}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition ${
        active
          ? "bg-[#276874] text-white"
          : "text-slate-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={20} />

      <span>{label}</span>
    </Link>
  );
}