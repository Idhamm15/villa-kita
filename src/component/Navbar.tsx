"use client";

import Link from "next/link";
import {
  FaHome,
  FaBookmark,
  FaPen,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-black gap-1 text-xl font-bold"
        >
          Villa Kita
          <FaHome className="h-6 w-6 text-sky-500" />
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-8 md:flex">
            <Link
                href="/"
                className="flex items-center gap-2 rounded-full bg-sky-500 px-3 py-2 text-white transition hover:bg-sky-600"
            >
            <FaHome className="text-[18px]" />
                Beranda
            </Link>

            <Link
                href="/sewa-villa"
                className="flex items-center gap-2 text-lg text-black hover:text-sky-500"
            >
            <FaHouse className="text-sm" />
                Sewa Villa
            </Link>

            <Link
                href="/blog"
                className="flex items-center gap-2 text-lg text-black hover:text-sky-500"
            >
            <FaPen className="text-sm" />
                Blog
            </Link>

            <Link
                href="/tersimpan"
                className="flex items-center gap-2 text-lg text-black hover:text-sky-500"
            >
            <FaBookmark className="text-sm" />
                Tersimpan
            </Link>

            <Link
                href="/kontak"
                className="flex items-center gap-2 text-lg text-black hover:text-sky-500"
            >
            <FaBookmark className="text-sm" />
                Kontak
            </Link>
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