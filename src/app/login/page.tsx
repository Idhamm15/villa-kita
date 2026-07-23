"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

     const result = await response.json();

      if (!result.status) {
        await Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: result.message,
        });

        return;
      }

      // simpan token
      Cookies.set(
        "access_token",
        result.data.access_token
      );

      Cookies.set(
        "refresh_token",
        result.data.refresh_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      await Toast.fire({
        icon: "success",
        title: "Login berhasil",
      });

      window.location.replace("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl bg-white shadow-sm px-10 py-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                <span className="text-xl">🏡</span>
                </div>

                <h1 className="text-3xl font-bold text-slate-800">
                Villa<span className="text-sky-500">Kita</span>
                </h1>
            </div>
            </div>

            {/* Heading */}
            <div className="text-center">
            <h2 className="text-2xl font-bold text-sky-500">
                Hi, Welcome Back
            </h2>

            <p className="mt-3 text-sx text-slate-500">
                Enter your credentials to continue
            </p>
            </div>

            {/* Form */}
            <form className="mt-10 space-y-6">
            {/* Email */}
            <div className="rounded-xl border border-sky-500 px-5 py-3">
                <label className="block text-sm text-gray-500">
                    Email Address / Username
                </label>

                <input
                    type="email"
                    placeholder="example@email.com"
                    className="mt-1 w-full border-none bg-transparent text-lg text-gray-700 font-semibold outline-none"
                />
            </div>

            {/* Password */}
            <div className="rounded-xl border border-sky-500 px-5 py-3">
                <label className="block text-sm text-gray-500">
                Password
                </label>

                <div className="mt-1 flex items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border-none bg-transparent text-lg font-semibold outline-none text-gray-700"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-sky-500"
                >
                    {showPassword ? (
                    <EyeOff size={22} />
                    ) : (
                    <Eye size={22} />
                    )}
                </button>
                </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-lg text-gray-600">
                <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300  accent-sky-500 "
                />

                Keep me logged in
                </label>

                <button
                type="button"
                className="font-medium text-sky-500 hover:underline"
                >
                Forgot Password?
                </button>
            </div>

            {/* Button */}
            <button
                className="w-full rounded-lg bg-sky-500 py-4 text-xl font-semibold text-white transition hover:bg-sky-700"
            >
                Sign In
            </button>
            </form>

            {/* Divider */}
            <div className="my-8 border-t"></div>

            {/* Footer */}
            <p className="text-center text-lg text-gray-600 font-medium">
            Don't have an account?{" "}
            <a
                href="/register"
                className="font-semibold text-sky-500 hover:underline"
            >
                Register
            </a>
            </p>
        </div>
        </div>
    );
}