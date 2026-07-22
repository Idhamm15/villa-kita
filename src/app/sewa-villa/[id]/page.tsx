import Banner from "@/component/Banner";
import DetailProduct from "@/component/DetailProduct";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Banner
        name="Villa Estetik"
        location="Puncak, Bogor"
        status="Open"
        openTime="00.00"
        closeTime="23.00"
        showAction={true}
      />
      <DetailProduct/>
      <Footer />
    </>
  );
}
