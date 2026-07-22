import { CircleUserRound } from "lucide-react";

export default function BookingUserCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <CircleUserRound
            className="text-blue-600"
            size={30}
          />
        </div>

        <div>
          <h3 className="font-bold">
            Logged in as Idham
          </h3>

          <p className="text-sm text-gray-500">
            USER
          </p>
        </div>

      </div>
    </div>
  );
}