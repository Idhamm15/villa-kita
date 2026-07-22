
import BookingSteps from "@/component/booking/BookingSteps";
import BookingSummary from "@/component/booking/BookingSummary";
import BookingUserCard from "@/component/booking/BookingUserCard";
import BookingVisitorType from "@/component/booking/BookingVisitorType";
import ContactForm from "@/component/booking/ContactForm";
import Navbar from "@/component/Navbar";

export default function BookingPage() {
  return (
    <>
      <Navbar/>
      <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          {/* Progress */}
          <BookingSteps currentStep={0} />

          {/* Content */}
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Left */}
            <div className="space-y-6 lg:col-span-8">

              <div>
                <h1 className="text-3xl font-bold">
                  Your Booking
                </h1>

                <p className="mt-2 text-gray-500">
                  Fill in your details and review your booking.
                </p>
              </div>

              <BookingUserCard />

              <BookingVisitorType />

              <ContactForm />

            </div>

            {/* Right */}
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