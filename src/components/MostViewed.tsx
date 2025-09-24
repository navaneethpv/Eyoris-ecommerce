import React from 'react';
import Image from 'next/image';

export default function MostViewed() {
  const products = [
    {
      id: 1,
      name: 'ZEBRONICS ZEB-BRO, With In-Line MIC, 3.5mm Jack, 10mm drivers, Compatible....',
      rating: 4,
      reviews: 1400,
      currentPrice: '₹299',
      oldPrice: '₹999',
      discount: '70% off',
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=MostViewed1', // Placeholder image
    },
    {
      id: 2,
      name: 'boAt BassHeads 100 Wired Earphones with Mic (Furious Red, In the Ear)',
      rating: 5,
      reviews: 3000,
      currentPrice: '₹399',
      oldPrice: '₹1,999',
      image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=MostViewed2', // Placeholder image
    },
    {
      id: 3,
      name: 'Motorola g45 5G (Pantone Dahlia Purple, 128 GB) (8 GB RAM)',
      rating: 5,
      reviews: 2000,
      currentPrice: '₹29,999',
      oldPrice: '₹50,000',
      image: 'https://via.placeholder.com/150/008000/FFFFFF?text=MostViewed3', // Placeholder image
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Most Viewed Products</h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
              </div>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-xl font-bold text-gray-900">{product.currentPrice}</span>
                <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
                {product.discount && <span className="text-sm text-green-600">{product.discount}</span>}
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
