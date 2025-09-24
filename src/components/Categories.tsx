import React from 'react';
import Image from 'next/image';

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: 'Earbuds',
      subtitle: 'Smartwatch is Good For You',
      image: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Earbuds', // Placeholder image
    },
    {
      id: 2,
      title: 'Speakers',
      subtitle: 'Experience Audio Like Never Before.',
      image: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Speakers', // Placeholder image
    },
    {
      id: 3,
      title: 'Laptops',
      subtitle: 'Power. Innovation. Mobility.',
      image: 'https://via.placeholder.com/300/008000/FFFFFF?text=Laptops', // Placeholder image
    },
    {
      id: 4,
      title: 'Mobile Phone',
      subtitle: 'The Future in Your Hands. Experience Innovation, Anytime, Anywhere.',
      image: 'https://via.placeholder.com/300/FFFF00/000000?text=MobilePhone', // Placeholder image
    },
    {
      id: 5,
      title: 'Accessories',
      subtitle: 'The Future in Your Hands. Experience Innovation, Anytime, Anywhere.',
      image: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=Accessories', // Placeholder image
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="relative h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={category.image}
              alt={category.title}
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
              <p className="text-white text-sm mb-4">{category.subtitle}</p>
              <a href="#" className="text-blue-400 hover:underline text-sm">Explore now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
