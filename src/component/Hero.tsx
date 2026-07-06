"use client";

import Image from "next/image";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[430px] w-full">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Search Box */}
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <div className="flex w-full max-w-3xl rounded-xl bg-white p-4 shadow-2xl h-20">
          <div className="flex flex-1 items-center rounded-lg border border-gray-300 px-5">
            <Search className="mr-3 h-6 w-6 text-gray-500" />

            <input
              type="text"
              placeholder="Any villa you want to rent?"
              className="h-14 w-full border-none text-lg outline-none text-gray-600"
            />
          </div>

          <button className="ml-5 rounded-lg bg-sky-500 px-12 text-xl font-semibold text-white transition hover:bg-sky-600">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}