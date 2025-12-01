import React from 'react';
import Footer from '@/components/home/components/Footer/Footer';
import Header from '@/components/home/components/Navigation/Header';

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
