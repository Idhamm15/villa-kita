"use client";

import Image from "next/image";
import { Clock3, Search } from "lucide-react";

interface Villa {
  id: number;
  name: string;
  image: string;
  open: string;
  close?: string;
  price: number;
  location: string;
}

const villas: Villa[] = [
  {
    id: 1,
    name: "Villa Puncak Highland",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 850000,
    location: "BOGOR",
  },
  {
    id: 2,
    name: "The Pine Forest Villa",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 1200000,
    location: "BOGOR",
  },
  {
    id: 3,
    name: "Villa Bukit Sentul",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 950000,
    location: "BOGOR",
  },
  {
    id: 4,
    name: "Jakarta Urban Villa",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 1800000,
    location: "JAKARTA",
  },
  {
    id: 5,
    name: "Kemang Private Villa",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 2100000,
    location: "JAKARTA",
  },
  {
    id: 6,
    name: "Villa Ciumbuleuit",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 1400000,
    location: "BANDUNG",
  },
  {
    id: 7,
    name: "Lembang Green Villa",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 1650000,
    location: "BANDUNG",
  },
  {
    id: 8,
    name: "Villa Dago Hills",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    open: "24 Hours",
    close: "",
    price: 1750000,
    location: "BANDUNG",
  },
];

export default function ListProduct() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-5">

        <div className="grid gap-8 lg:grid-cols-12">

          {/* ================= Sidebar ================= */}

          <aside className="lg:col-span-3 space-y-5">

            {/* Search */}

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  placeholder="Type restaurant name"
                  className="w-full rounded-md border pl-10 pr-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Capacity */}

            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="mb-4 font-semibold text-gray-700">
                Table capacity
              </h3>

              <div className="space-y-3">

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-gray-700">4 Person(s)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-gray-700">6 Person(s)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-gray-700">2 Person(s)</span>
                </label>

              </div>
            </div>

            {/* Location */}

            <div className="rounded-lg bg-white p-4 shadow">

              <h3 className="mb-4 font-semibold text-gray-700">
                Locations
              </h3>

              <div className="space-y-4">

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                  />
                  <span className="text-gray-700">All</span>
                </label>

                <label className="flex items-start gap-3">

                  <input type="checkbox" />

                  <div>
                    <p className="text-gray-700">KOTA TEGAL</p>

                    <small className="text-gray-500">
                      JAWA TENGAH
                    </small>
                  </div>

                </label>

                <label className="flex items-start gap-3">

                  <input type="checkbox" />

                  <div>
                    <p className="text-gray-700">KABUPATEN TEGAL</p>

                    <small className="text-gray-500">
                      JAWA TENGAH
                    </small>
                  </div>

                </label>

              </div>

            </div>

            <button className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
              Filter
            </button>

          </aside>

          {/* ================= Product ================= */}

          <main className="lg:col-span-9">

            <h2 className="mb-5 text-2xl font-bold">
              Showing restaurants in all locations
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {villas.map((item) => (

                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition"
                >

                  <div className="relative h-52">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="p-4">

                    <a 
                      href={`/sewa-villa/${item.id}`}
                      className="font-bold text-lg leading-6 text-gray-700"
                    >
                      {item.name}
                    </a>

                    <div className="mt-2 flex items-center gap-1 text-orange-500 text-sm">

                      <Clock3 size={14} />

                      {item.open} - {item.close}

                    </div>

                    <p className="mt-2 text-gray-500 text-sm">
                      Menu start from{" "}
                      <span className="font-semibold text-blue-600">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Pagination */}

            <div className="mt-10 flex justify-center">

              <button className="h-10 w-10 rounded-full bg-blue-400 shadow font-semibold">
                1
              </button>

            </div>

          </main>

        </div>

      </div>
    </section>
  );
}