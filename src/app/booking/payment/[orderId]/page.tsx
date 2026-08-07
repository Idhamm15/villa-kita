"use client"

import Navbar from "@/component/Navbar";
import BookingSteps from "@/component/booking/BookingSteps";
import PaymentCountdown from "@/component/payment/PaymentCountdown";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentInstruction from "@/component/payment/PaymentInstruction";
import TransferGuide from "@/component/payment/TransferGuide";
import PaymentCompleted from "@/component/payment/PaymentCompleted";

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

              <PaymentCountdown />

              <PaymentInstruction 
                booking={booking}
              />

              <TransferGuide />

              <PaymentCompleted />

            </div>

          </div>

        </div>
      </div>
    </>
  );
}