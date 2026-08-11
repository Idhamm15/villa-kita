import FeaturedVillas from "@/component/FeaturedVillas";
import Footer from "@/component/Footer";
import Hero from "@/component/Hero";
import ListProduct from "@/component/ListProduct";
import Navbar from "@/component/Navbar";
import ListVilla from "@/component/villa/ListVilla";
import WhyChooseUs from "@/component/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <ListVilla />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
