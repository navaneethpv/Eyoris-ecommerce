import React from 'react';
import Footer from '@/components/home/components/Footer/Footer';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-white'>
      {children}
      <Footer />
      
    </section>
  );
}
