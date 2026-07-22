import Navbar from "@/component/Navbar";
import HeaderProfile from "@/component/profil/HeaderProfile";
import PurchaseEmpty from "@/component/profil/PurchaseEmpty";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <div className="grid gap-8 lg:grid-cols-12">

            <div className="lg:col-span-3">
              <HeaderProfile />
            </div>

            <div className="lg:col-span-9">
              <h1 className="mb-6 text-3xl font-bold">
                My Booking
              </h1>

              {/* <PurchaseCard /> */}
                <PurchaseEmpty />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}