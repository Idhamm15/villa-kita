"use clients"

import { getProducts } from "@/handle/handleProduct";
import VillaCard from "./VillaCard";


export default async function FeaturedVillas() {
  const villas = await getProducts();

  return (
    <section className="-mt-20 relative z-10">
      <div className="mx-auto w-full rounded-tl-[40px] rounded-tr-[40px] bg-white px-10 py-12 shadow-xl">
        <h2 className="text-3xl font-bold text-black">
          Top Villa Picks
        </h2>

        <p className="mt-3 text-lg text-gray-500">
          Temukan villa terbaik untuk liburan bersama keluarga.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {villas.map((villa) => (
            <VillaCard
              key={villa.id}
              id={villa.id}
              image={villa.thumbnail}
              title={villa.name}
              location={villa.location || "-"}
              price={villa.priceStart || "0"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}