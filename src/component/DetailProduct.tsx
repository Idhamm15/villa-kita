"use client";

import {
  ArrowRight,
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
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useLogout from "@/handle/handleAuth";



export async function getProductDetail(id: string) {
  const res = await fetch(`/api/products/${id}`);
  const json = await res.json();

  if (!res.ok || !json.status) {
    throw new Error(json.message || "Produk tidak ditemukan.");
  }

  return json.data as ProductDetail;
}

interface ProductImage {
  id: string;
  image: string | null;
}

interface ProductItem {
  id: string;
  name: string;
  type: string;
  sort: number;
}

interface ProductDetail {
  id: string;
  name: string;
  location?: string | null;
  address: string;
  urlMaps?: string | null;
  description: string;
  priceStart: string;
  price: string;
  thumbnail: string;
  totalBedroom: number;
  totalBathroom: number;
  maxGuest: number;
  typeUnit: string;
  stock: number;
  isActive: boolean;
  typeProperty: string[];
  typeBooking: string[];
  images: ProductImage[];
  items: ProductItem[];
}

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

export default function DetailProduct() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};
  
  const handleLogout = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("token");
    Cookies.remove("role");
    localStorage.clear();
  };

  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductDetail(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Gagal memuat detail produk.");
        setProduct(null);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const gallery = useMemo(() => {
    if (!product) {
      return ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"];
    }

    const images = [product.thumbnail, ...product.images.map((item) => item.image).filter(Boolean) as string[]];
    return images.length ? images.slice(0, 5) : ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"];
  }, [product]);

  const mapEmbedUrl = useMemo(() => {
    if (!product?.urlMaps) {
      return "https://www.google.com/maps?q=-6.595038,106.816635&z=15&output=embed";
    }

    if (product.urlMaps.includes("google.com") && !product.urlMaps.includes("output=embed")) {
      return `${product.urlMaps}${product.urlMaps.includes("?") ? "&" : "?"}output=embed`;
    }

    return product.urlMaps;
  }, [product]);

  const handleBooking = async () => {
    if (!product) return;

    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await handleLogout();
        router.push("/login");
        return;
      }

      setLoadingBooking(true);
      router.push(`/booking/${product.id}`);
    } catch (error) {
      console.error(error);

      await handleLogout();
      router.push("/login");
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-24 text-center text-xl text-gray-700">
        Loading detail produk...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-24 text-center text-xl text-gray-700">
        {error ?? "Produk tidak ditemukan."}
      </div>
    );
  }

  const facilityItems = product.items.length
    ? product.items.map((item) => item.name)
    : ["Fasilitas belum tersedia"];

  return (
    <section className="bg-white rounded-t-[50px] pb-16 -mt-10 z-50">
      <div className="mx-auto -mt-24 max-w-7xl px-6">
        <div className="mt-10 grid gap-3 lg:grid-cols-3 shadow-2xl">
          <div className="relative h-105 overflow-hidden rounded-2xl lg:col-span-2">
            <Image
              src={gallery[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 shadow-2xl">
            {gallery.slice(1).map((img, index) => (
              <div key={index} className="relative h-50 overflow-hidden rounded-2xl">
                <Image
                  src={img}
                  alt={`${product.name} - ${index + 2}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />

                {index === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <button className="flex items-center gap-2 rounded-lg bg-white/20 px-5 py-3 text-lg font-semibold backdrop-blur-md">
                      <Images size={22} />
                      Lihat Semua Foto
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
              <p className="mt-2 text-lg text-slate-600">{product.location ?? product.address}</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-sm text-slate-500">Status</p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {product.isActive ? "Open" : "Closed"}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="rounded-2xl bg-slate-50 p-6 shadow-sm lg:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Max Tamu</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{product.maxGuest}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 shadow-sm lg:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Kamar Tidur</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{product.totalBedroom}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 shadow-sm lg:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Kamar Mandi</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{product.totalBathroom}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 shadow-sm lg:col-span-3">
              <p className="text-sm font-semibold text-slate-500">Unit</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">/{product.typeUnit}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 mt-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg lg:col-span-8">
            <div className="flex items-center gap-3">
              <CircleHelp className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-blue-700">Tentang {product.typeProperty.join(", ")}</h2>
            </div>
            <p className="mt-6 leading-8 text-slate-600">{product.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold">Kategori</p>
                <p className="mt-2 text-slate-600">{product.typeProperty.join(", ")}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold">Tipe Booking</p>
                <p className="mt-2 text-slate-600">{product.typeBooking.join(", ")}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold">Alamat</p>
                <p className="mt-2 text-slate-600">{product.address}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold">Jumlah Stok</p>
                <p className="mt-2 text-slate-600">{product.stock}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">Fasilitas</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {facilityItems.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 p-4 text-slate-600">
                    ✔ {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <p className="text-sm text-slate-500">Booking mulai dari</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-bold text-orange-600">Rp {product.price}</span>
                <span className="pb-2 text-sm text-slate-500">/ malam</span>
              </div>
              <p className="mt-2 text-sm text-slate-400 line-through">Rp {product.priceStart}</p>

              <button
                onClick={handleBooking}
                disabled={loadingBooking}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingBooking ? (
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

            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-blue-700">Lokasi</h2>
              </div>

              <hr className="my-5" />
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="200"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-slate-800">{product.name}</h3>
                <p className="text-sm text-slate-600">{product.address}</p>
                <a
                  href={product.urlMaps ?? "https://maps.google.com/?q=-6.595038,106.816635"}
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

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-blue-700">Rating & Ulasan</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-sm text-slate-500">124 Ulasan</p>
            </div>
          </div>

          <hr className="my-6" />
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="h-full rounded-xl border border-slate-200 p-6 transition hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="my-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="leading-7 text-slate-600">"{review.comment}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
