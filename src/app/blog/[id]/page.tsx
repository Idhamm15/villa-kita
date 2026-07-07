"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/component/Footer";
import { CalendarDays, User, ArrowUp } from "lucide-react";
import Banner from "@/component/Banner";
import Navbar from "@/component/Navbar";

export default function DetailBlog() {
  const blog = {
    id: 1,
    slug: "first-blog",
    title: "7 Tips Memilih Villa Terbaik di Puncak Bogor",
    thumbnail:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    created_at: "2026-07-01",
    author: "Admin Villa Kita",
    content: [
      "Liburan bersama keluarga tentu akan lebih menyenangkan jika memilih villa yang tepat. Selain lokasi yang strategis, fasilitas yang lengkap juga menjadi salah satu faktor penting sebelum melakukan booking.",

      "Pastikan villa memiliki fasilitas seperti kolam renang, dapur, area BBQ, tempat parkir yang luas, serta akses internet yang memadai agar seluruh anggota keluarga merasa nyaman selama menginap.",

      "Sebelum memesan, jangan lupa membaca ulasan dari tamu sebelumnya. Review dapat memberikan gambaran mengenai kebersihan, pelayanan, hingga kondisi villa yang sebenarnya.",

      "Terakhir, pilih villa sesuai dengan budget dan kebutuhan agar pengalaman liburan menjadi lebih berkesan.",
    ],
  };

  const relatedBlogs = [
    {
      id: 2,
      slug: "villa-bandung",
      title: "Villa Private Pool Terbaik di Bandung",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      date: "2026-07-02",
    },
    {
      id: 3,
      slug: "villa-jakarta",
      title: "Staycation Mewah di Jakarta",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      date: "2026-07-03",
    },
    {
      id: 4,
      slug: "villa-lembang",
      title: "Villa Instagramable di Lembang",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      date: "2026-07-04",
    },
  ];

  return (
    <>
      <Navbar />
      <Banner
        breadcrumb="Blog"
        name={blog.title}
      />
      <section className="bg-white py-24 rounded-t-[50px] pb-16 -mt-10 z-50">
        {/* Hero */}
        <div className="relative h-[260px] md:h-[420px] mx-24 -mt-36 rounded-2xl">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            priority
            className="object-cover rounded-2xl"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-sky-600/40 rounded-2xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 mx-auto -mt-24 max-w-5xl px-6">
          <div className="rounded-3xl bg-white px-8 py-10 shadow-xl md:px-16">
            <h1 className="text-center text-3xl font-bold text-slate-800 md:text-5xl">
              {blog.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />

                <span>
                  {new Date(blog.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-20">
          <article className="space-y-8 text-lg leading-9 text-slate-700">
            {blog.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-14 text-center text-4xl font-bold text-slate-800">
            Related Articles
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Link href={`/blog/${item.slug}`}>
                  <div className="relative h-60">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={15} />

                    <span>
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link href={`/blog/${item.slug}`}>
                    <h3 className="mt-4 text-2xl font-bold text-slate-800 transition hover:text-sky-600">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mt-4 text-slate-600">
                    Temukan rekomendasi villa terbaik dengan fasilitas lengkap
                    untuk liburan keluarga maupun staycation.
                  </p>

                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-6 inline-flex font-semibold text-sky-600 hover:text-sky-700"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Back To Top */}
      <button
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-xl transition hover:scale-110"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
}