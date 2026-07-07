"use client";

import Navbar from "@/component/Navbar";
import { BookmarkX } from "lucide-react";

export default function Page() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900">
            List Tersimpan
        </h2>

        <p className="mt-2 text-slate-600">
          A place to keep all your favorite items!
        </p>

        {/* Empty State */}
        <div className="mt-8 flex items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Icon */}
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-sky-100">
            <BookmarkX
              size={52}
              className="text-sky-600"
              strokeWidth={1.8}
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              No Saved Item Yet
            </h3>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
              Start building your bucket list to compare and track the
              items you love!
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}