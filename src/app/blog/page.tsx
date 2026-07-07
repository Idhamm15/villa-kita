import Banner from "@/component/Banner";
import Footer from "@/component/Footer";
import ListBlog from "@/component/ListBlog";
import Navbar from "@/component/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner
        breadcrumb="Blog"
      />
      <ListBlog />
      <Footer />
    </>
  );
}
