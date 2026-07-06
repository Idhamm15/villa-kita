"use client";

import {
  FaCalendarCheck,
  FaMoneyCheckDollar,
  FaShieldHalved,
} from "react-icons/fa6";

const features = [
  {
    icon: FaCalendarCheck,
    title: "Easy Booking",
    description:
      "Book your favorite villa quickly and securely in just a few simple steps.",
  },
  {
    icon: FaMoneyCheckDollar,
    title: "Flexible Payment",
    description:
      "Pay with various payment methods and enjoy affordable pricing.",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Reservation",
    description:
      "Your booking and payment are protected with industry-standard security.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-bold text-gray-900">
          Why Choose Villa Kita?
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Icon size={36} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}