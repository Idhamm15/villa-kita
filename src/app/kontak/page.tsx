"use client";

import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Page() {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <section className="bg-gradient-to-r from-sky-700 to-blue-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-bold">
            Hubungi Kami
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100">
            Ada pertanyaan mengenai villa, reservasi, ataupun kerja sama?
            Tim Villa Kita siap membantu Anda.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-slate-50 py-20 py-24 rounded-t-[50px] pb-16 -mt-10 z-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Mari Terhubung
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Jangan ragu menghubungi kami apabila Anda membutuhkan
              informasi mengenai villa, booking, ataupun rekomendasi
              tempat menginap terbaik.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4">
                <div className="rounded-xl bg-sky-100 p-4">
                  <MapPin className="text-sky-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Alamat</h3>
                  <p className="text-slate-500">
                    Jl. Pajajaran No.123, Bogor,
                    Jawa Barat
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-sky-100 p-4">
                  <Phone className="text-sky-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Telepon</h3>
                  <p className="text-slate-500">
                    +62 812-3456-7890
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-sky-100 p-4">
                  <Mail className="text-sky-600" />
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-slate-500">
                    hello@villakita.id
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-sky-100 p-4">
                  <Clock3 className="text-sky-600" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Jam Operasional
                  </h3>

                  <p className="text-slate-500">
                    Senin - Minggu
                    <br />
                    08.00 - 22.00 WIB
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800">
              Kirim Pesan
            </h2>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full rounded-xl border text-gray-400 border-gray-300 p-4 outline-none focus:border-sky-500"
              />

              <input
                type="email"
                placeholder="Alamat Email"
                className="w-full rounded-xl border text-gray-400 border-gray-300 p-4 outline-none focus:border-sky-500"
              />

              <input
                type="text"
                placeholder="Subjek"
                className="w-full rounded-xl border text-gray-400 border-gray-300 p-4 outline-none focus:border-sky-500"
              />

              <textarea
                rows={6}
                placeholder="Tulis pesan Anda..."
                className="w-full rounded-xl border text-gray-400 border-gray-300 p-4 outline-none focus:border-sky-500"
              />

              <button className="flex items-center gap-3 rounded-xl bg-sky-600 px-8 py-4 font-semibold text-white border-gray-300 transition hover:bg-sky-700">
                <Send size={18} />
                Kirim Pesan
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* MAP */}
      <section className="py-10 bg-blue-200">
        <div className="mx-auto max-w-7xl px-6">

          <div className="overflow-hidden rounded-3xl shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Bogor&output=embed"
              className="h-[450px] w-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">

          <h2 className="mb-12 text-center text-4xl font-bold text-gray-700">
            Pertanyaan Umum
          </h2>

          <div className="space-y-6">

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center gap-3 font-semibold text-gray-700">
                <MessageCircle className="text-sky-600" />
                Bagaimana cara melakukan booking?
              </div>

              <p className="mt-4 text-slate-600">
                Anda dapat melakukan booking langsung melalui halaman
                detail villa atau menghubungi customer service kami.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center gap-3 font-semibold text-gray-700">
                <MessageCircle className="text-sky-600" />
                Apakah bisa refund?
              </div>

              <p className="mt-4 text-slate-600">
                Refund mengikuti kebijakan masing-masing villa dan waktu
                pembatalan.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center gap-3 font-semibold text-gray-700   ">
                <MessageCircle className="text-sky-600" />
                Apakah tersedia customer service 24 jam?
              </div>

              <p className="mt-4 text-slate-600">
                Customer service kami tersedia setiap hari pukul
                08.00-22.00 WIB.
              </p>
            </div>

          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}