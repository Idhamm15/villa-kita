"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBookmark,
  FaPen,
  FaPhone,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Beranda",
      href: "/",
      icon: FaHome,
    },
    {
      title: "Sewa Villa",
      href: "/sewa-villa",
      icon: FaHouse,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: FaPen,
    },
    {
      title: "Tersimpan",
      href: "/tersimpan",
      icon: FaBookmark,
    },
    {
      title: "Kontak",
      href: "/kontak",
      icon: FaPhone,
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-xl font-semibold text-black transition hover:text-sky-500"
        >
          <img src="/img/logo.png" alt="Logo" className="h-20 w-16" />
          Villa Kita
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-4 md:flex">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              menu.href === "/"
                ? pathname === "/"
                : pathname.startsWith(menu.href);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-lg font-medium transition-all duration-200 ${
                  active
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-black hover:bg-sky-50 hover:text-sky-500"
                }`}
              >
                <Icon className="text-sm" />
                {menu.title}
              </Link>
            );
          })}
        </nav>

        {/* Login */}
        <Link
          href="/login"
          className="rounded-lg bg-gray-300 px-8 py-3 text-lg font-semibold text-white transition hover:bg-gray-400"
        >
          Login
        </Link>
      </div>
    </header>
  );
}