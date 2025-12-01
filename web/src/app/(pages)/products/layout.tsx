import Footer from '@/components/home/components/Footer/Footer';
import Header from '@/components/home/components/Navigation/Header';
import React from 'react';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-white'>
          <Header />
          {children}
          <Footer />
          
        </section>
  );
}
