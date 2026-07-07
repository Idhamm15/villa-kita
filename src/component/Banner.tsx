"use client";

import Image from "next/image";
import {
  Bookmark,
  Clock3,
  MapPin,
  Share2,
  ChevronRight,
  Images,
} from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white">
      {/* Background Decoration */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl"></div>
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 mb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-blue-100">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>Restaurant</span>
          <ChevronRight size={16} />
          <span className="font-semibold text-lime-300">
            RM. Bu Tomo Slawi
          </span>
        </div>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              RM. Bu Tomo Slawi
            </h1>

            <div className="mt-4 flex items-center gap-2 text-lg text-blue-100">
              <MapPin size={18} />
              <span>
                Kembang, Slawi Wetan, Kec. Slawi,
                Kabupaten Tegal, Jawa Tengah 52411
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-lg">
              <Clock3 size={18} />
              <span className="font-semibold text-green-300">
                Open
              </span>
              <span>|</span>
              <span>00.00 - 23.00</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-4">
            <button className="rounded-full bg-white p-3 text-blue-600 transition hover:scale-105">
              <Share2 size={22} />
            </button>

            <button className="rounded-full bg-white p-3 text-blue-600 transition hover:scale-105">
              <Bookmark size={22} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}