import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import BestDeals from "@/components/home/BestDeals";
import MostViewed from "@/components/home/MostViewed";
import Categories from "@/components/home/Categories";
import Promotions from "@/components/home/Promotions";
import Footer from "@/components/home/Footer";
import { CartProvider } from "@/context/CartContext"; // Import CartProvider

export default function Home() {
  return (
    <CartProvider> {/* Wrap the entire page content with CartProvider */}
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
    </CartProvider>
  );
}
