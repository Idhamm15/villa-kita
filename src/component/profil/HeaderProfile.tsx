 "use client";
import useLogout from "@/handle/handleAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function HeaderProfile() {
  const pathname = usePathname();

  const [user, setUser] = useState<{
    name: string;
    image?: string;
    role?: string;
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
            role: json.data.role || undefined,
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
      title: "Purchase List",
      href: "/profil/purchase-list",
      icon: ClipboardList,
    },
    {
      title: "My Booking",
      href: "/profil/my-booking",
      icon: CalendarDays,
    },
    {
      title: "My Account",
      href: "/profil",
      icon: User,
    },
  ];

  const { handleLogout } = useLogout();
  return (
    <div className="rounded-2xl border-gray-400 bg-white shadow-sm">

      {/* Profile */}

      <div className="flex items-center gap-4 p-5">

        <Image
          src={user?.image || "/images/avatar.png"}
          alt="profile"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />

        <div>

          <h2 className="font-bold text-lg">
            {user?.name || "User"}
          </h2>

          <p className="text-sm text-gray-500">
            {user?.role === "ADMIN" || user?.role === "OWNER" ? "ADMIN" : "GUEST"}
          </p>

        </div>

      </div>

      <hr className="border-gray-400" />

      {/* Menu */}

      <div className="py-3">

        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition

              ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }
              `}
            >
              <Icon size={20} />

              {menu.title}
            </Link>
          );
        })}

        <hr className="my-3 border-gray-400" />

        <button
          onClick={() => handleLogout()}
          className="mx-3 flex w-[calc(100%-24px)] items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50">

          <LogOut size={20} />

          Log Out

        </button>

      </div>

    </div>
  );
}