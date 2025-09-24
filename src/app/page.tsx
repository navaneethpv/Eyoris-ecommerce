import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BestDeals from "@/components/BestDeals";
import MostViewed from "@/components/MostViewed";
import Categories from "@/components/Categories";
import Promotions from "@/components/Promotions";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <BestDeals />
        <MostViewed />
        <Categories />
        <Promotions />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
