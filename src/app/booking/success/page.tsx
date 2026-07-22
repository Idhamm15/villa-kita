import Navbar from "@/component/Navbar";
import BookingSteps from "@/component/booking/BookingSteps";
import BookingSummary from "@/component/booking/BookingSummary";
import PaymentCompleted from "@/component/payment/PaymentCompleted";
import PaymentCountdown from "@/component/payment/PaymentCountdown";
import PaymentInstruction from "@/component/payment/PaymentInstruction";
import TransferGuide from "@/component/payment/TransferGuide";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <BookingSteps currentStep={3} />

          <div className="mt-8 grid gap-8 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-8">

              <PaymentCountdown />

              <PaymentInstruction />

              <TransferGuide />

              <PaymentCompleted />

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