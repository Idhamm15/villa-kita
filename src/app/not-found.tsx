import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
        <div className="max-w-xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <SearchX className="h-12 w-12 text-red-500" />
          </div>

          <h1 className="mt-8 text-6xl font-bold text-slate-900">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Sorry, the page you are looking for doesn't exist,
            has been moved, or the URL is incorrect.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}