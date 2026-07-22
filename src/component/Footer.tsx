"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-800 text-white mt-30">

      {/* BACKGROUND SHAPE */}
      <div className="absolute left-0 top-20 h-[400px] w-[400px] opacity-10">
        <div className="h-full w-full rounded-full border border-cyan-400" />
      </div>

      <div className="absolute right-0 top-20 h-[400px] w-[400px] opacity-10">
        <div className="h-full w-full rounded-full border border-cyan-400" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* TOP CONTACT */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 py-10 md:grid-cols-3">

          {/* EMAIL */}
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg text-white"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-white/60">
                Email
              </p>

              <h4 className="text-lg font-semibold">
                villakita@gmail.com
              </h4>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-lg text-white"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-white/60">
                Telepon
              </p>

              <h4 className="text-lg font-semibold">
                +62 123 234 2345 (Admin) <br />
              </h4>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-lg text-white"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-white/60">
                Alamat Kantor
              </p>

              <h4 className="text-lg font-semibold">
                Jakarta, Indonesia
              </h4>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* ABOUT */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Tentang Kami
            </h3>

            <p className="leading-8 text-white/70">
              Sewa villa dan hotel dengan mudah dan cepat. Temukan villa impian Anda di berbagai lokasi terbaik di Indonesia.
            </p>

            <div className="mt-8">
              <p className="mb-4 font-semibold">
                Office :
              </p>

              <div className="space-y-5 text-white/70">
                <p className="leading-7">
                  Jakarta, Indonesia
                </p>

              </div>
            </div>

            {/* SOCIAL */}
             <div className="flex space-x-3 mt-5">
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-yellow-500 hover:text-white transition">
                <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
              </a>
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-yellow-500 hover:text-white transition">
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-yellow-500 hover:text-white transition">
                <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              </a>
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-yellow-500 hover:text-white transition">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Layanan Kami
            </h3>

            <ul className="space-y-4 text-white/80">

              <li>
                <a
                  href="/jasa-pembuatan-aplikasi"
                  className="transition hover:text-cyan-300"
                >
                  Jasa Pemesanan Villa
                </a>
              </li>
              <li>
                <a
                  href="/jasa-pembuatan-aplikasi"
                  className="transition hover:text-cyan-300"
                >
                  Jasa Pemesanan Hotel
                </a>
              </li>

              
            </ul>
          </div>

          {/* QUICK LINK */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Pintasan Link
            </h3>

            <ul className="space-y-4 text-white/80">
              <li>
                <a href="/sewa-villa-bogor" className="transition hover:text-cyan-300">
                  Sewa Villa Bogor
                </a>
              </li>
              <li>
                <a href="/sewa-villa-jakarta" className="transition hover:text-cyan-300">
                  Sewa Villa Jakarta
                </a>
              </li>
              <li>
                <a href="/sewa-villa-bandung" className="transition hover:text-cyan-300">
                  Sewa Villa Bandung
                </a>
              </li>

              
            </ul>
          </div>

          {/* PAGES */}
          <div>
            <h3 className="mb-6 text-xl font-bold">
              Halaman
            </h3>

            <ul className="space-y-4 text-white/80">

              <li>
              <a href="/" className="transition hover:text-cyan-300">
                  Beranda
                </a>
              </li>

              <li>
                <a href="/layanan" className="transition hover:text-cyan-300">
                  Sewa Villa
                </a>
              </li>

              <li>
                <a href="/portofolio" className="transition hover:text-cyan-300">
                  Blog
                </a>
              </li>

              <li>
                <a href="/blog" className="transition hover:text-cyan-300">
                  Saved
                </a>
              </li>

              <li>
                <a href="kontak-kami" className="transition hover:text-cyan-300">
                  Kontak
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 bg-blue-300 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm font-medium text-white md:flex-row lg:px-10">

          <p>
            Copyright © 2026 Villa Kita. All rights reserved.
          </p>

          <p>
            Developed by Villa Kita 
          </p>

        </div>
      </div>
    </footer>
  );
}