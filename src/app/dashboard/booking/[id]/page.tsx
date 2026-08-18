// "use client";

// import { useState } from "react";
// import HeaderDashboard from "@/component/admin/HeaderDashboard";
// import NavbarDashboard from "@/component/admin/NavbarDashboard";
// import { ArrowLeft, Plus } from "lucide-react";

// export default function Page() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);


//   return (
//     <div className="min-h-screen bg-white flex overflow-hidden">

//     {/* Sidebar */}
//     <HeaderDashboard
//         sidebarOpen={sidebarOpen}
//         onCloseSidebar={() => setSidebarOpen(false)}
//     />

//     {/* Main */}
//     <main className="flex-1 p-4 md:p-6 overflow-y-auto">

//         <NavbarDashboard
//         onOpenSidebar={() => setSidebarOpen(true)}
//         />

//         <div className="rounded-3xl bg-gray-100 p-12">

//         {/* ===== HEADER ===== */}
//         <div className="mb-8">

//             <button
//                 type="button"
//                 onClick={() => history.back()}
//                 className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
//             >
//             <ArrowLeft size={22} />
//             <span>Kembali</span>
//             </button>

//         </div>

//         <div className="space-y-8">

//             {/* Header */}
//             <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                     Detail Booking
//                 </h1>

//                 <p className="mt-1 text-sm text-gray-500">
//                     ID: cmrp2wsgi000004l5f6licdji
//                 </p>
//             </div>

//             <div className="grid gap-6 lg:grid-cols-3">

//                 {/* LEFT */}
//                 <div className="space-y-6 lg:col-span-2">

//                     {/* Informasi Tamu */}
//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-6 text-xl font-bold">
//                             Informasi Tamu
//                         </h2>

//                         <div className="grid gap-6 md:grid-cols-2">

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Nama Lengkap
//                                 </p>
//                                 <p className="font-semibold">
//                                     WW ee
//                                 </p>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Email
//                                 </p>
//                                 <p className="font-semibold">
//                                     123@gmail.com
//                                 </p>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     No. Telepon
//                                 </p>
//                                 <p className="font-semibold">
//                                     0858989686
//                                 </p>
//                             </div>

//                         </div>

//                     </div>

//                     {/* Informasi Properti */}

//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-5 text-xl font-bold">
//                             Informasi Properti
//                         </h2>

//                         <h3 className="text-xl font-semibold">
//                             Villa Pak Maryono
//                         </h3>

//                         <p className="mt-2 text-gray-500">
//                             Bogor, Jawa Barat
//                         </p>

//                         <p className="mt-3 font-semibold text-blue-600">
//                             Harga per malam Rp 1.500.000
//                         </p>

//                     </div>

//                     {/* Detail Booking */}

//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-6 text-xl font-bold">
//                             Detail Booking
//                         </h2>

//                         <div className="grid gap-8 md:grid-cols-2">

//                             <div className="space-y-6">

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Check-in
//                                     </p>

//                                     <p className="font-semibold">
//                                         Jumat, 17 Juli 2026
//                                     </p>

//                                     <p className="text-purple-600">
//                                         14.00 WIB
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Durasi Menginap
//                                     </p>

//                                     <p className="font-semibold">
//                                         1 Malam
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Jumlah Kamar
//                                     </p>

//                                     <p className="font-semibold">
//                                         1 Kamar
//                                     </p>
//                                 </div>

//                             </div>

//                             <div className="space-y-6">

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Check-out
//                                     </p>

//                                     <p className="font-semibold">
//                                         Sabtu, 18 Juli 2026
//                                     </p>

//                                     <p className="text-purple-600">
//                                         12.00 WIB
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Jumlah Tamu
//                                     </p>

//                                     <p className="font-semibold">
//                                         2 Dewasa
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Tipe Unit
//                                     </p>

//                                     <p className="font-semibold">
//                                         Standard
//                                     </p>
//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//                 {/* RIGHT */}

//                 <div className="space-y-6">

//                     {/* Status */}

//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-5 text-xl font-bold">
//                             Status
//                         </h2>

//                         <div className="space-y-4">

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Booking Status
//                                 </p>

//                                 <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
//                                     Cancelled
//                                 </span>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Payment Status
//                                 </p>

//                                 <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold">
//                                     Expired
//                                 </span>
//                             </div>

//                         </div>

//                     </div>

//                     {/* Pembayaran */}

//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-5 text-xl font-bold">
//                             Pembayaran
//                         </h2>

//                         <div className="space-y-3">

//                             <div className="flex justify-between">
//                                 <span>Subtotal</span>
//                                 <span>Rp 1.500.000</span>
//                             </div>

//                             <div className="flex justify-between">
//                                 <span>Pajak</span>
//                                 <span>Rp 165.000</span>
//                             </div>

//                             <hr />

//                             <div className="flex justify-between text-lg font-bold">

//                                 <span>Total</span>

//                                 <span className="text-purple-600">
//                                     Rp 1.665.000
//                                 </span>

//                             </div>

//                             <hr />

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     Metode Pembayaran
//                                 </p>

//                                 <p className="font-semibold">
//                                     Bank Transfer
//                                 </p>

//                             </div>

//                         </div>

//                     </div>

//                     {/* Informasi Lain */}

//                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//                         <h2 className="mb-5 text-xl font-bold">
//                             Informasi Lainnya
//                         </h2>

//                         <div className="space-y-4">

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Dibuat pada
//                                 </p>

//                                 <p className="font-semibold">
//                                     17/07/2026 22:14
//                                 </p>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Payment Reference
//                                 </p>

//                                 <p className="font-semibold break-all">
//                                     cmrp2wsgi000004l5f6licdji
//                                 </p>
//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>

//         </div>

//     </main>

//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  Home,
  CreditCard,
} from "lucide-react";

import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import { FetchBooking } from "@/lib/querry/booking.query";


export default function Page() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [booking, setBooking] = useState<FetchBooking | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH DETAIL BOOKING
  // ==========================

  const fetchBooking = async () => {
    try {
      setLoading(true);

      const result = await apiFetch(
        `/bookings/get-id/${id}`
      );

      if (result.status) {
        setBooking(result.data);
      } else {
        setBooking(null);
      }
    } catch (error) {
      console.error(
        "Gagal mengambil detail booking:",
        error
      );

      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FETCH
  // ==========================

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (
    date?: string | null
  ) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ==========================
  // FORMAT DATETIME
  // ==========================

  const formatDateTime = (
    date?: string | null
  ) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ==========================
  // FORMAT CURRENCY
  // ==========================

  const formatCurrency = (
    value?: number | string | null
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Rp 0";
    }

    return `Rp ${Number(value).toLocaleString(
      "id-ID"
    )}`;
  };

  // ==========================
  // CALCULATE NIGHT
  // ==========================

  const calculateNights = (
    checkIn?: string,
    checkOut?: string
  ) => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // ==========================
  // STATUS CLASS
  // ==========================

  const getBookingStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "EXPIRED":
        return "bg-gray-100 text-gray-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================
  // PAYMENT STATUS CLASS
  // ==========================

  const getPaymentStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "EXPIRED":
        return "bg-gray-100 text-gray-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex overflow-hidden">

        <HeaderDashboard
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() =>
            setSidebarOpen(false)
          }
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">

          <NavbarDashboard
            onOpenSidebar={() =>
              setSidebarOpen(true)
            }
          />

          <div className="rounded-3xl bg-gray-100 p-12 min-h-[80vh] flex items-center justify-center">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#01085a]" />

          </div>
        </main>

      </div>
    );
  }

  // ==========================
  // NOT FOUND
  // ==========================

  if (!booking) {
    return (
      <div className="min-h-screen bg-white flex overflow-hidden">

        <HeaderDashboard
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() =>
            setSidebarOpen(false)
          }
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">

          <NavbarDashboard
            onOpenSidebar={() =>
              setSidebarOpen(true)
            }
          />

          <div className="rounded-3xl bg-gray-100 p-12 min-h-[80vh]">

            <button
              type="button"
              onClick={() => router.back()}
              className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
            >
              <ArrowLeft size={22} />
              <span>Kembali</span>
            </button>

            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

              <h2 className="text-xl font-bold text-gray-900">
                Booking tidak ditemukan
              </h2>

              <p className="mt-2 text-gray-500">
                Data booking yang kamu cari tidak
                tersedia.
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }

  const nights = calculateNights(
    booking.checkIn,
    booking.checkOut
  );

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ==========================
          SIDEBAR
      ========================== */}

      <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() =>
          setSidebarOpen(false)
        }
      />

      {/* ==========================
          MAIN
      ========================== */}

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        <NavbarDashboard
          onOpenSidebar={() =>
            setSidebarOpen(true)
          }
        />

        <div className="rounded-3xl bg-gray-100 p-12">

          {/* ==========================
              HEADER
          ========================== */}

          <div className="mb-8">

            <button
              type="button"
              onClick={() => router.back()}
              className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600"
            >
              <ArrowLeft size={22} />
              <span>Kembali</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
              Detail Booking
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Booking Code:{" "}
              <span className="font-medium text-gray-700">
                {booking.bookingCode}
              </span>
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* ==========================
                LEFT
            ========================== */}

            <div className="space-y-6 lg:col-span-2">

              {/* ==========================
                  INFORMASI TAMU
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold">
                  Informasi Tamu
                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">
                      Nama Lengkap
                    </p>

                    <p className="font-semibold">
                      {booking.nameGuest ||
                        booking.user?.fullname ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold">
                      {booking.emailGuest ||
                        booking.user?.email ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      No. Telepon
                    </p>

                    <p className="font-semibold">
                      {booking.phoneGuest || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Jumlah Tamu
                    </p>

                    <p className="font-semibold">
                      {booking.totalGuest} Orang
                    </p>
                  </div>

                </div>

              </div>

              {/* ==========================
                  INFORMASI PROPERTI
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold">
                  Informasi Properti
                </h2>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Home size={26} />
                  </div>

                  <div>

                    <h3 className="text-xl font-semibold">
                      {booking.product?.name ||
                        "-"}
                    </h3>

                    <p className="mt-2 text-gray-500">
                      {booking.product?.location ||
                        "-"}
                    </p>

                    <p className="mt-3 font-semibold text-blue-600">
                      Harga per malam{" "}
                      {formatCurrency(
                        booking.product?.price
                      )}
                    </p>

                  </div>

                </div>

              </div>

              {/* ==========================
                  DETAIL BOOKING
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold">
                  Detail Booking
                </h2>

                <div className="grid gap-8 md:grid-cols-2">

                  {/* LEFT */}

                  <div className="space-y-6">

                    <div>
                      <p className="text-sm text-gray-500">
                        Check-in
                      </p>

                      <p className="font-semibold">
                        {formatDate(
                          booking.checkIn
                        )}
                      </p>

                      <p className="text-purple-600">
                        14.00 WIB
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Durasi Menginap
                      </p>

                      <p className="font-semibold">
                        {nights}{" "}
                        {nights === 1
                          ? "Malam"
                          : "Malam"}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="space-y-6">

                    <div>
                      <p className="text-sm text-gray-500">
                        Check-out
                      </p>

                      <p className="font-semibold">
                        {formatDate(
                          booking.checkOut
                        )}
                      </p>

                      <p className="text-purple-600">
                        12.00 WIB
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Jumlah Tamu
                      </p>

                      <p className="font-semibold">
                        {booking.totalGuest} Orang
                      </p>
                    </div>

                  </div>

                </div>

                {booking.note && (
                  <div className="mt-8 border-t pt-6">

                    <p className="text-sm text-gray-500">
                      Catatan
                    </p>

                    <p className="mt-1 font-medium">
                      {booking.note}
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* ==========================
                RIGHT
            ========================== */}

            <div className="space-y-6">

              {/* ==========================
                  STATUS
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold">
                  Status
                </h2>

                <div className="space-y-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Booking Status
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getBookingStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <span
                      className='mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold'
                    >
                      {booking.paymentMethod}
                    </span>

                  </div>

                </div>

              </div>

              {/* ==========================
                  PEMBAYARAN
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold">
                  Pembayaran
                </h2>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Metode Pembayaran
                      </p>

                      <p className="font-semibold">
                        {booking.paymentMethod ||
                          "-"}
                      </p>
                    </div>

                  </div>

                  <hr />

                  <div className="flex justify-between">

                    <span>
                      Harga per malam
                    </span>

                    <span>
                      {formatCurrency(
                        booking.product?.price
                      )}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>
                      Durasi
                    </span>

                    <span>
                      {nights} malam
                    </span>

                  </div>

                  <hr />

                  <div className="flex justify-between text-lg font-bold">

                    <span>
                      Total
                    </span>

                    <span className="text-purple-600">
                      {formatCurrency(
                        booking.totalPrice
                      )}
                    </span>

                  </div>

                  {booking.transactionId && (
                    <>
                      <hr />

                      <div>

                        <p className="text-sm text-gray-500">
                          Transaction ID
                        </p>

                        <p className="mt-1 font-semibold break-all">
                          {booking.transactionId}
                        </p>

                      </div>
                    </>
                  )}

                </div>

              </div>

              {/* ==========================
                  INFORMASI LAIN
              ========================== */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold">
                  Informasi Lainnya
                </h2>

                <div className="space-y-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Dibuat pada
                    </p>

                    <p className="font-semibold">
                      {formatDateTime(
                        booking.createdAt
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Booking Code
                    </p>

                    <p className="font-semibold break-all">
                      {booking.bookingCode}
                    </p>

                  </div>

                  {booking.orderId && (
                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-semibold break-all">
                        {booking.orderId}
                      </p>

                    </div>
                  )}

                  {booking.paidAt && (
                    <div>

                      <p className="text-sm text-gray-500">
                        Dibayar pada
                      </p>

                      <p className="font-semibold">
                        {formatDateTime(
                          booking.paidAt
                        )}
                      </p>

                    </div>
                  )}

                  {booking.expiredAt && (
                    <div>

                      <p className="text-sm text-gray-500">
                        Expired pada
                      </p>

                      <p className="font-semibold">
                        {formatDateTime(
                          booking.expiredAt
                        )}
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}