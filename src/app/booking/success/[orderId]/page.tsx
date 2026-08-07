"use client"

import Navbar from "@/component/Navbar";
import BookingSteps from "@/component/booking/BookingSteps";
import { CheckCircle2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const { orderId } = useParams();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("BCA Virtual Account");

    useEffect(() => {
      getBooking();
    }, []);

    const getBooking = async () => {
      try {
        const response = await fetch(
          `/api/bookings/${orderId}`
        );

        const result = await response.json();

        if (!response.ok) {
          alert(result.message);
          return;
        }

        setBooking(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!booking) {
      return <div>Booking tidak ditemukan</div>;
    }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <BookingSteps currentStep={3} />

          <div className="mt-12 grid gap-8 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-12">

              {/* HALAMAN SUCCESS PAYMENT */}
              <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">

                <div className="flex flex-col items-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>

                  <h1 className="mt-6 text-3xl font-bold">
                    Booking Created Successfully 🎉
                  </h1>

                  <p className="mt-3 max-w-xl text-gray-600">
                    Your booking has been successfully created.
                    Please complete the payment before the expiration time
                    to confirm your reservation.
                  </p>

                </div>

                <div className="mt-10 grid gap-5 rounded-xl border bg-slate-50 p-6 md:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">
                      Booking Code
                    </p>

                    <p className="mt-1 font-semibold">
                      {booking.bookingCode}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-semibold">
                      {booking.orderId}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Guest Name
                    </p>

                    <p className="mt-1 font-semibold">
                      {booking.nameGuest}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <p className="mt-1 font-semibold uppercase">
                      {booking.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Payment
                    </p>

                    <p className="mt-1 text-xl font-bold text-sky-600">
                      Rp {Number(booking.totalPrice).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>

                    <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                      Waiting Payment
                    </span>
                  </div>

                </div>

                <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">

                  <h3 className="font-semibold">
                    Payment Information
                  </h3>

                  <p className="mt-4 text-sm text-gray-500">
                    Virtual Account Number
                  </p>

                  <div className="mt-2 flex items-center justify-between rounded-lg border bg-white p-4">

                    <span className="text-xl font-bold tracking-widest">
                      {booking.paymentToken}
                    </span>

                    <button
                      className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Copy
                    </button>

                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Complete your payment before:
                  </p>

                  <p className="mt-1 font-semibold text-red-600">
                    {new Date(booking.expiredAt).toLocaleString("id-ID")}
                  </p>

                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                  <button
                    className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
                  >
                    View Booking
                  </button>

                  <button
                    className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
                  >
                    Back to Home
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}