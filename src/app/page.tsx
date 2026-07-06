import FeaturedVillas from "@/component/FeaturedVillas";
import Footer from "@/component/Footer";
import Hero from "@/component/Hero";
import Navbar from "@/component/Navbar";
import WhyChooseUs from "@/component/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedVillas />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
