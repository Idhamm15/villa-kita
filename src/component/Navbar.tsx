"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaBookmark,
  FaPen,
  FaPhone,
  FaRunning,
} from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import Cookies from "js-cookie";
import { FaHouse } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();

  const [user, setUser] = useState<{
    name: string;
    image?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const loadUser = async () => {
      try {

        const token = Cookies.get("access_token");
        
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (res.ok && json.status && json.data) {
          setUser({
            name: json.data.fullname || json.data.username || "User",
            image: json.data.image || undefined,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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
      title: "Trip",
      href: "/trip",
      icon: FaRunning,
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
  const isLogin = !!user;

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

        {/* Right Side */}
        <div className="flex items-center">
          {loading ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
          ) : isLogin ? (
            <UserDropdown
              name={user!.name}
              image={user!.image}
            />
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-gray-300 px-8 py-3 text-lg font-semibold text-white transition hover:bg-gray-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}