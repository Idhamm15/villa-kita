"use client";

import {
  Bookmark,
  ChevronRight,
  Clock3,
  MapPin,
  Share2,
} from "lucide-react";

interface BannerProps {
  breadcrumb?: React.ReactNode;
  name?: React.ReactNode;
  location?: React.ReactNode;
  status?: React.ReactNode;
  openTime?: React.ReactNode;
  closeTime?: React.ReactNode;
  showAction?: boolean;
}

export default function Banner({
  breadcrumb,
  name,
  location,
  status,
  openTime,
  closeTime,
  showAction = false,
}: BannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white">
      {/* Background Decoration */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative mx-auto mb-20 max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-blue-100">
          <span>Home</span>
          {breadcrumb && (
            <>
              <ChevronRight size={16} />
              <span>{breadcrumb}</span>
            </>
          )}

          {name && (
            <>
              <ChevronRight size={16} />
              <span className="font-semibold text-lime-300">{name}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            {name && (
              <h1 className="text-4xl font-bold">
                {name}
              </h1>
            )}

            {location && (
              <div className="mt-4 flex items-center gap-2 text-lg text-blue-100">
                <MapPin size={18} />
                <span>{location}</span>
              </div>
            )}

            {(status || openTime || closeTime) && (
              <div className="mt-3 flex items-center gap-2 text-lg">
                <Clock3 size={18} />

                {status && (
                  <span className="font-semibold text-green-300">
                    {status}
                  </span>
                )}

                {status && (openTime || closeTime) && <span>|</span>}

                {(openTime || closeTime) && (
                  <span>
                    {openTime}
                    {openTime && closeTime ? " - " : ""}
                    {closeTime}
                  </span>
                )}
              </div>
            )}
          </div>

          {showAction && (
            <div className="flex gap-4">
              <button className="rounded-full bg-white p-3 text-blue-600 transition hover:scale-105">
                <Share2 size={22} />
              </button>

              <button className="rounded-full bg-white p-3 text-blue-600 transition hover:scale-105">
                <Bookmark size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}