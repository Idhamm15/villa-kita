"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Images,
  MapPin,
  MessageSquare,
  NotebookText,
  Star,
} from "lucide-react";
import Image from "next/image";

export default function DetailProduct() {
const gallery = [
    "/images/restaurants/banner.jpg",
    "/images/restaurants/food1.jpg",
    "/images/restaurants/food2.jpg",
    "/images/restaurants/interior.jpg",
    "/images/restaurants/interior2.jpg",
  ];
  return (
    // h-16 rounded-t-[50px] bg-white
    <section className="bg-white rounded-t-[50px] pb-16 -mt-10 z-50">
      <div className="mx-auto -mt-10 max-w-7xl px-6 ">
          {/* Gallery */}
        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {/* Left */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl lg:col-span-2">
            <Image
              src={gallery[0]}
              alt=""
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-3">
            {gallery.slice(1).map((img, index) => (
              <div
                key={index}
                className="relative h-[200px] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />

                {index === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <button className="flex items-center gap-2 rounded-lg bg-white/20 px-5 py-3 text-lg font-semibold backdrop-blur-md">
                      <Images size={22} />
                      See All Photos
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Top Cards */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Rating */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-3">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                0
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-700">
                  Excellent
                </h3>

                <p className="mt-1 text-gray-500">
                  From 0 reviews
                </p>
              </div>

              <ArrowRight className="ml-auto text-blue-600" />
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-4">
                <MapPin className="text-blue-600" size={28} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-700">
                  Show Map
                </h3>

                <p className="text-gray-600">
                  SLAWI, KABUPATEN TEGAL
                </p>
              </div>

              <ArrowRight className="ml-auto text-blue-600" />
            </div>
          </div>

          {/* Price */}
          <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-4">
            <p className="text-gray-500">Menu start from</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold text-orange-600">
                Rp 6.000
              </span>

              <span className="pb-1 text-gray-400 line-through">
                Rp 11.000
              </span>
            </div>

            <button className="mt-5 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
              Find Tables
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Experience */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3">
                <CircleHelp
                  className="text-blue-600"
                  size={24}
                />

                <h2 className="text-xl font-bold text-blue-700">
                  What You'll Experience
                </h2>
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                Destinasi kuliner legendaris di Slawi yang
                terkenal dengan sate kambing, gulai kambing,
                tongseng, sop buntut, dan berbagai menu khas
                lainnya. Tempat makan yang nyaman dengan area
                luas sehingga cocok untuk makan bersama keluarga,
                teman maupun rombongan.
              </p>

              <button className="mt-8 font-semibold text-blue-600 hover:underline">
                Read More
              </button>

              <hr className="my-8" />

              <div className="flex items-center gap-3">
                <NotebookText
                  className="text-blue-600"
                  size={24}
                />

                <h2 className="text-xl font-bold text-blue-700">
                  Contacts, Facilities, and More
                </h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold">
                    📍 Address
                  </p>

                  <p className="mt-2 text-gray-600">
                    Kembang, Slawi Wetan, Kabupaten Tegal
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold">
                    📞 Phone
                  </p>

                  <p className="mt-2 text-gray-600">
                    +62 812-3456-7890
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold">
                    🕒 Opening Hours
                  </p>

                  <p className="mt-2 text-gray-600">
                    Every Day
                    <br />
                    00.00 - 23.00
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold">
                    ⭐ Facilities
                  </p>

                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>✔ Parking Area</li>
                    <li>✔ Musholla</li>
                    <li>✔ Toilet</li>
                    <li>✔ Family Room</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3">
                <MessageSquare
                  className="text-blue-600"
                  size={24}
                />

                <h2 className="text-xl font-bold text-blue-700">
                  What Others Are Saying
                </h2>
              </div>

              <hr className="my-5" />

              <div className="flex flex-col items-center py-10 text-center">
                <Star
                  size={50}
                  className="text-yellow-400"
                  fill="#facc15"
                />

                <p className="mt-6 text-gray-500">
                  There are no reviews for this
                  restaurant yet.
                </p>

                <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                  Write Review
                </button>
              </div>

              <div className="mt-10 flex justify-center gap-6">
                <button className="rounded-full border p-3 hover:bg-gray-100">
                  <ChevronLeft />
                </button>

                <button className="rounded-full border p-3 hover:bg-gray-100">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}