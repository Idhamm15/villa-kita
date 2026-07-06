import VillaCard from "./VillaCard";

const villas = [
  {
    title: "Villa Santorini",
    location: "Bandung",
    price: "850.000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villa Puncak Indah",
    location: "Bogor",
    price: "1.250.000",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villa Kayu Bali",
    location: "Bali",
    price: "2.300.000",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villa Tropical",
    location: "Lembang",
    price: "900.000",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villa Sunrise",
    location: "Malang",
    price: "750.000",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedVillas() {
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
              key={villa.title}
              {...villa}
            />
          ))}
        </div>
      </div>
    </section>
  );
}