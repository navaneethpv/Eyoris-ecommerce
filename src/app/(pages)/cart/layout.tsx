import React from 'react';
import Header from '@/components/home/components/Navigation/Header';
import Footer from '@/components/home/Footer';

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
