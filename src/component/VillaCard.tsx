import Image from "next/image";
import { FaClock } from "react-icons/fa";

interface VillaCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
}

export default function VillaCard({
  image,
  title,
  location,
  price,
}: VillaCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-60 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-xl font-semibold text-gray-700">
            {title}
          </h3>

          <p className="mt-1 text-gray-500">
            {location}
          </p>
        </div>

        <div className="flex items-center gap-2 text-orange-500">
          <FaClock />
          <span>Check In 14.00</span>
        </div>

        <div className="text-gray-400">
          Start from{" "}
          <span className="font-semibold text-sky-600">
            Rp {price}
          </span>
          <span className="text-gray-500"> / malam</span>
        </div>
      </div>
    </div>
  );
}