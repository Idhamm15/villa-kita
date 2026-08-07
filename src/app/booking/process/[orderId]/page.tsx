"use client"

import Navbar from "@/component/Navbar";
import BookingSteps from "@/component/booking/BookingSteps";
import BookingSummary from "@/component/booking/BookingSummary";
import BookingSummaryForPayment from "@/component/booking/BookingSummaryForPayment";
import PaymentButton from "@/component/payment/PaymentButton";
import PaymentCountdown from "@/component/payment/PaymentCountdown";
import PaymentHeader from "@/component/payment/PaymentHeader";
import PaymentMethod from "@/component/payment/PaymentMethod";
import PaymentTotal from "@/component/payment/PaymentTotal";
import PaymentType from "@/component/payment/PaymentType";
import { Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";



export default function PaymentPage() {

    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
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

    const handlePayment = async () => {
    try {
        const response = await fetch(`/api/bookings/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            paymentMethod,
        }),
        });

        const result = await response.json();

        if (!response.ok) {
        alert(result.message);
        return;
        }

        router.push(`/booking/payment/${result.data.orderId}`);
    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan.");
    }
    };

  
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <BookingSteps currentStep={2} />

          <PaymentHeader />

          <div className="mt-8 grid gap-8 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-8">
              <PaymentMethod
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <PaymentTotal
                booking={booking}
              />

              <button
                onClick={handlePayment}
                className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Pay with <span className="uppercase">{paymentMethod}</span>
              </button>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BookingSummaryForPayment
                  booking={booking}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}