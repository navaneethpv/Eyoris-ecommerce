import React from "react";
import Header from "@/components/home/components/Navigation/Header";
import Footer from "@/components/home/components/Footer/Footer";

export const metadata = {
  title: "Eyoris",
};

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <Header />
      <main className="pt-6 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
