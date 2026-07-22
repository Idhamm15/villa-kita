import Navbar from "@/component/Navbar";
import BookingSteps from "@/component/booking/BookingSteps";
import BookingSummary from "@/component/booking/BookingSummary";
import PaymentButton from "@/component/payment/PaymentButton";
import PaymentCountdown from "@/component/payment/PaymentCountdown";
import PaymentHeader from "@/component/payment/PaymentHeader";
import PaymentMethod from "@/component/payment/PaymentMethod";
import PaymentTotal from "@/component/payment/PaymentTotal";
import PaymentType from "@/component/payment/PaymentType";



export default function PaymentPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <BookingSteps currentStep={2} />

          <PaymentHeader />

          <div className="mt-8 grid gap-8 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-8">
              <PaymentCountdown />
              <PaymentMethod />
              <PaymentType />
              <PaymentTotal />
              <PaymentButton />
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BookingSummary />
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}