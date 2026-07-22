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
              Villa<span className="text-violet-600">Kita</span>
            </h1>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-violet-600">
            Sign Up
          </h2>

          <p className="mt-3 text-gray-500">
            Enter your details to continue
          </p>

          <p className="mt-6 text-xl font-semibold text-gray-800">
            Sign up with Email address
          </p>
        </div>

        <form className="mt-10 space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-purple-600 px-5 py-3">
              <label className="block text-sm text-gray-500">
                First Name
              </label>

              <input
                type="text"
                placeholder="John"
                className="mt-1 w-full bg-transparent text-lg font-semibold text-gray-700 outline-none"
              />
            </div>

            <div className="rounded-xl border border-purple-600 px-5 py-3">
              <label className="block text-sm text-gray-500">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Doe"
                className="mt-1 w-full bg-transparent text-lg font-semibold text-gray-700 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-purple-600 px-5 py-3">
            <label className="block text-sm text-gray-500">
              Email Address / Username
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="mt-1 w-full bg-transparent text-lg font-semibold text-gray-700 outline-none"
            />
          </div>

          {/* Password */}
          <div className="rounded-xl border border-purple-600 px-5 py-3">
            <label className="block text-sm text-gray-500">
              Password
            </label>

            <div className="mt-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent text-lg font-semibold text-gray-700 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-violet-600"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Agreement */}
          <label className="flex items-center gap-3 text-gray-700">
            <input
              type="checkbox"
              className="h-5 w-5 rounded accent-violet-600"
            />

            <span>
              Agree with{" "}
              <Link
                href="/terms"
                className="font-semibold text-violet-600 hover:underline"
              >
                Terms & Conditions
              </Link>
            </span>
          </label>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Footer */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}