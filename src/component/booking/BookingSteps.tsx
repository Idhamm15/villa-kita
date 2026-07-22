"use client";

import Link from "next/link";
import {
  CalendarCheck2,
  Package,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";

const steps = [
  {
    title: "Book",
    icon: CalendarCheck2,
    href: "/booking",
  },
  {
    title: "Addon",
    icon: Package,
    href: "/booking/addon",
  },
  {
    title: "Pay",
    icon: CreditCard,
    href: "/booking/payment",
  },
  {
    title: "Finish",
    icon: CircleCheckBig,
    href: "/booking/success",
  },
];

interface Props {
  currentStep: number;
}

export default function BookingSteps({ currentStep }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step.title}
              className="flex flex-1 items-center"
            >
              <Link
                href={step.href}
                className="flex flex-col items-center"
              >
                <div
                  className={`
                  flex h-14 w-14 items-center justify-center rounded-full border-2 transition

                  ${
                    completed
                      ? "border-green-500 bg-green-500 text-white"
                      : active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                  `}
                >
                  <Icon size={24} />
                </div>

                <span
                  className={`
                  mt-3 text-sm font-semibold

                  ${
                    active
                      ? "text-blue-600"
                      : completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                  `}
                >
                  {step.title}
                </span>
              </Link>

              {index !== steps.length - 1 && (
                <div
                  className={`
                  mx-4 h-1 flex-1 rounded-full

                  ${
                    completed
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}