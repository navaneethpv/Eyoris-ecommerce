import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] bg-gray-200 flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1523381294911-8d3cead2ad71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        alt="On Sale Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
      <div className="relative z-20 text-white text-center space-y-4">
        <p className="text-lg uppercase tracking-widest">Looks We Love:</p>
        <h1 className="text-6xl font-bold uppercase">On Sale</h1>
        <p className="text-xl">Your favorite, most loved, most wanted looks are up to</p>
        <p className="text-5xl font-extrabold">65% Off</p>
        <button className="mt-6 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg transition duration-300">
          Shop now
        </button>
      </div>
      {/* Navigation arrows */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-gray-800 hover:bg-opacity-75 transition duration-300 z-30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-gray-800 hover:bg-opacity-75 transition duration-300 z-30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}
