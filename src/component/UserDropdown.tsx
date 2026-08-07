"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FaUser,
  FaShoppingBag,
  FaClipboardList,
  FaPowerOff,
} from "react-icons/fa";
import useLogout from "@/handle/handleAuth";

type Props = {
  name: string;
  image?: string;
};

export default function UserDropdown({ name, image }: Props) {
  const { handleLogout } = useLogout();
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-3 rounded-full focus:outline-none">
        <img
          src={image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"}
          alt={name}
          className="h-11 w-11 rounded-full border-2 border-sky-500 object-cover"
        />

        <span className="hidden text-lg font-medium md:block">
          {name}
        </span>
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="mt-3 w-64 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
      >
        <div className="px-5 py-4 border-b">
          <p className="font-semibold">{name}</p>
        </div>

        <MenuItem>
          <Link
            href="/profil"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <FaUser className="text-sky-500" />
            Edit Profile
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            href="/profil/purchase-list"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <FaShoppingBag className="text-sky-500" />
            Purchase List
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            href="/profil/my-booking"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <FaClipboardList className="text-sky-500" />
            My Booking
          </Link>
        </MenuItem>

        <div className="border-t">
          <MenuItem>
            <button
              onClick={() => handleLogout()}
              className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-red-50"
            >
              <FaPowerOff className="text-red-500" />
              Log Out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}