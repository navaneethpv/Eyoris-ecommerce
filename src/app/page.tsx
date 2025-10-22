import Header from "@/components/home/components/Navigation/Header";
import Hero from "@/components/home/components/Hero/Hero";
import Features from "@/components/home/components/Features/Features";
import BestDeals from "@/components/home/components/BestDeals/BestDeals";
import MostViewed from "@/components/home/MostViewed";
import Categories from "@/components/home/components/Catergoris/CategoriesSection";
import Promotions from "@/components/home/Promotions";
import Footer from "@/components/home/components/Footer/Footer";

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
        <Footer />
      </div>
  );
}
