import React from 'react';
import Header from '@/components/home/components/Navigation/Header';
import Footer from '@/components/home/components/Footer/Footer';

export default function CartLayout({
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
