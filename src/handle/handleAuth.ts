"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function useLogout() {
  const router = useRouter();

  const handleLogout = async (showConfirmation = true) => {
    try {
      if (showConfirmation) {
        const result = await Swal.fire({
          title: "Logout",
          text: "Apakah Anda yakin ingin keluar?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Batal",
          confirmButtonColor: "#0ea5e9",
        });

        if (!result.isConfirmed) return;
      }

      await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Bersihkan storage client
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("token");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logout berhasil");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal logout");
    }
  };

  return {
    handleLogout,
  };
}