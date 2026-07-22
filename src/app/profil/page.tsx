import Navbar from "@/component/Navbar";
import AccountInformation from "@/component/profil/AccountInformation";
import HeaderProfile from "@/component/profil/HeaderProfile";

export default function AccountPage() {
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
              <div className="rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-6 text-3xl font-bold">
                  My Account
                </h1>

                {/* Form akun */}
                <AccountInformation/>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}