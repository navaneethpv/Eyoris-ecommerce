'use client'
import React from 'react';
import Image from 'next/image';

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: 'Earbuds',
      subtitle: 'Smartwatch is Good For You',
      image: '/assets/Images/catergories/earpod.png', // Earbuds image
    },
    {
      id: 2,
      title: 'Speakers',
      subtitle: 'Experience Audio Like Never Before.',
      image: '/assets/Images/catergories/speaker.png', // Placeholder image
    },
    {
      id: 3,
      title: 'Laptops',
      subtitle: 'Power. Innovation. Mobility.',
      image: '/assets/Images/catergories/laptop.png', // Placeholder image
    },
    {
      id: 4,
      title: 'Mobile Phone',
      subtitle: 'The Future in Your Hands. Experience Innovation, Anytime, Anywhere.',
      image: '/assets/Images/catergories/phone.png', // Placeholder image
    },
    {
      id: 5,
      title: 'Accessories',
      subtitle: 'The Future in Your Hands. Experience Innovation, Anytime, Anywhere.',
      image: '/assets/Images/catergories/accessories.png', // Placeholder image
    },
  ];

  console.log(categories[0])
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 h-[700px]">
        {/* Earbuds (categories[0]) - Top-left */}
        <div key={categories[0].id} className="relative rounded-lg overflow-hidden shadow-md">
          {/* <Image
            src={categories[0].image}
            alt={categories[0].title}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
            onError={(e) => ((e.target as HTMLImageElement).src = '/assets/Images/catergories/accessories.png')} // Fallback to original path if placeholder fails
          /> */}
           <Image
                  src={categories[0].image}
                  alt={categories[0].title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="z-0"
                />
          <div className="absolute inset-0 bg-opacity-40 z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{categories[0].title}</h3>
            <p className="text-white text-sm mb-4">{categories[0].subtitle}</p>
            <a href="#" className="text-white hover:underline text-sm">Explore now</a>
          </div>
        </div>

        {/* Speakers (categories[1]) - Middle, spans 2 rows */}
        <div key={categories[1].id} className="relative row-span-2 rounded-lg overflow-hidden shadow-md">
          <Image
            src={categories[1].image}
            alt={categories[1].title}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-opacity-40 z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{categories[1].title}</h3>
            <p className="text-white text-sm mb-4">{categories[1].subtitle}</p>
            <a href="#" className="text-white hover:underline text-sm">Explore now</a>
          </div>
        </div>

        {/* Laptops (categories[2]) - Top-right */}
        <div key={categories[2].id} className="relative rounded-lg overflow-hidden shadow-md">
          <Image
            src={categories[2].image}
            alt={categories[2].title}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-opacity-10 z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{categories[2].title}</h3>
            <p className="text-white text-sm mb-4">{categories[2].subtitle}</p>
            <a href="#" className="text-white hover:underline text-sm">Explore now</a>
          </div>
        </div>

        {/* Mobile Phone (categories[3]) - Bottom-left */}
        <div key={categories[3].id} className="relative rounded-lg overflow-hidden shadow-md">
          <Image
            src={categories[3].image}
            alt={categories[3].title}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-opacity-40 z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{categories[3].title}</h3>
            <p className="text-white text-sm mb-4">{categories[3].subtitle}</p>
            <a href="#" className="text-white hover:underline text-sm">Explore now</a>
          </div>
        </div>

        {/* Accessories (categories[4]) - Bottom-right */}
        <div key={categories[4].id} className="relative rounded-lg overflow-hidden shadow-md">
          <Image
            src={categories[4].image}
            alt={categories[4].title}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-opacity-40 z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{categories[4].title}</h3>
            <p className="text-white text-sm mb-4">{categories[4].subtitle}</p>
            <a href="#" className="text-white hover:underline text-sm">Explore now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
