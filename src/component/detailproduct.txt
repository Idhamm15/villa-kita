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
  ScrollText,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function DetailProduct() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleBooking = () => {
    setLoading(true);


    setTimeout(() => {
      router.push("/booking");
    }, 5000);
  };
  const gallery = [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
  ];

  const reviews = [
    {
      id: 1,
      name: "Andi Pratama",
      rating: 5,
      date: "2 minggu lalu",
      comment:
        "Villa sangat bersih, pemandangan luar biasa, dan staf sangat ramah. Sangat cocok untuk liburan keluarga.",
    },
    {
      id: 2,
      name: "Siti Rahma",
      rating: 5,
      date: "1 bulan lalu",
      comment:
        "Kolam renangnya bersih, kamar nyaman, dan akses menuju lokasi cukup mudah. Akan kembali lagi.",
    },
    {
      id: 3,
      name: "Budi Santoso",
      rating: 4,
      date: "3 minggu lalu",
      comment:
        "Tempatnya bagus dan tenang. Cocok untuk healing bersama pasangan maupun keluarga.",
    },
  ];
  return (
    // h-16 rounded-t-[50px] bg-white
    <section className="bg-white rounded-t-[50px] pb-16 -mt-10 z-50">
      {/* <Banner /> */}
      <div className="mx-auto -mt-24 max-w-7xl px-6 ">
          {/* Gallery */}
        <div className="mt-10 grid gap-3 lg:grid-cols-3 shadow-2xl ">
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
          <div className="grid grid-cols-2 gap-3 shadow-2xl">
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
                5
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-700">
                  Max Tamu
                </h3>

                <p className="mt-1 text-gray-500">
                  5 Orang
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
            <p className="text-gray-500">Booking mulai dari</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold text-orange-600">
                Rp 1.500.000
              </span>

              <span className="pb-1 text-gray-400">
                /malam
                <br />
              </span>
            </div>

              <span className="pb-1 text-gray-400 line-through">
                Rp. 2.000.000
                <br />
              </span>

              <button
                onClick={handleBooking}
                disabled={loading}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CalendarCheck size={20} />
                    Pesan Sekarang
                  </>
                )}
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
                  Apa saja yang ada di villa ini?
                </h2>
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                Villa dengan khas yang minimalis dengan view di keliingi pegunungan 360 derajat dengan ketinggian 1000mdpl sangat cocok untuk anda yang ingin menginap sebagai tempat singgah.
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
                <ScrollText
                  className="text-blue-600"
                  size={24}
                />

                <h2 className="text-xl font-bold text-blue-700">
                  Syarat & Ketentuan Berlaku
                </h2>
              </div>

              <hr className="my-5" />
              <ul className="mt-2 space-y-1 text-gray-600 text-">
                <li>✔ Tidak dapat dikembalikan</li>
                <li>✔ Konfirmasi via Email</li>
                <li>✔ Tanpa Login</li>
              </ul>
              

          
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg mt-10">
              <div className="flex items-center gap-3">
                <MapPin
                  className="text-blue-600"
                  size={24}
                />

                <h2 className="text-xl font-bold text-blue-700">
                  Lokasi Villa
                </h2>
              </div>

              <hr className="my-5" />

              <div className="overflow-hidden rounded-xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps?q=-6.595038,106.816635&z=15&output=embed"
                  width="100%"
                  height="120"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">
                  Villa Kita Bogor
                </h3>
                <p className="text-sm text-gray-600">
                  Jl. Contoh No. 123, Bogor, Jawa Barat
                </p>

                <a
                  href="https://maps.google.com/?q=-6.595038,106.816635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare
                className="text-blue-600"
                size={24}
              />

              <h2 className="text-xl font-bold text-blue-700">
                Rating & Ulasan
              </h2>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Star
                  className="fill-yellow-400 text-yellow-400"
                  size={20}
                />
                <span className="text-2xl font-bold">4.9</span>
              </div>

              <p className="text-sm text-gray-500">
                124 Ulasan
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="h-full rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                        {review.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {review.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="my-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="leading-7 text-gray-600">
                    "{review.comment}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}