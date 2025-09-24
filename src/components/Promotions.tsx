import React from 'react';
import Image from 'next/image';

export default function Promotions() {
  const promotions = [
    {
      id: 1,
      title: 'Up to 70% off | Festive Deals You Can\'t Miss',
      items: [
        'https://via.placeholder.com/100/FF0000/FFFFFF?text=Promo1_1',
        'https://via.placeholder.com/100/FF0000/FFFFFF?text=Promo1_2',
        'https://via.placeholder.com/100/FF0000/FFFFFF?text=Promo1_3',
        'https://via.placeholder.com/100/FF0000/FFFFFF?text=Promo1_4',
      ],
    },
    {
      id: 2,
      title: 'Trending Now Best Sellers in Electronics & Fashion',
      items: [
        'https://via.placeholder.com/100/0000FF/FFFFFF?text=Promo2_1',
        'https://via.placeholder.com/100/0000FF/FFFFFF?text=Promo2_2',
        'https://via.placeholder.com/100/0000FF/FFFFFF?text=Promo2_3',
        'https://via.placeholder.com/100/0000FF/FFFFFF?text=Promo2_4',
      ],
    },
    {
      id: 3,
      title: 'Flat 50% off Home & Kitchen Essentials',
      items: [
        'https://via.placeholder.com/100/008000/FFFFFF?text=Promo3_1',
        'https://via.placeholder.com/100/008000/FFFFFF?text=Promo3_2',
        'https://via.placeholder.com/100/008000/FFFFFF?text=Promo3_3',
        'https://via.placeholder.com/100/008000/FFFFFF?text=Promo3_4',
      ],
    },
    {
      id: 4,
      title: 'Up to 45% OFF on Skin & Hair Care Products',
      items: [
        'https://via.placeholder.com/100/FFFF00/000000?text=Promo4_1',
        'https://via.placeholder.com/100/FFFF00/000000?text=Promo4_2',
        'https://via.placeholder.com/100/FFFF00/000000?text=Promo4_3',
        'https://via.placeholder.com/100/FFFF00/000000?text=Promo4_4',
      ],
    },
    {
      id: 5,
      title: 'Flat ₹2000 OFF on Laptops & Tablets',
      items: [
        'https://via.placeholder.com/100/FF00FF/FFFFFF?text=Promo5_1',
        'https://via.placeholder.com/100/FF00FF/FFFFFF?text=Promo5_2',
        'https://via.placeholder.com/100/FF00FF/FFFFFF?text=Promo5_3',
        'https://via.placeholder.com/100/FF00FF/FFFFFF?text=Promo5_4',
      ],
    },
    {
      id: 6,
      title: 'Footwear Sale: Starting at just ₹499',
      items: [
        'https://via.placeholder.com/100/00FFFF/000000?text=Promo6_1',
        'https://via.placeholder.com/100/00FFFF/000000?text=Promo6_2',
        'https://via.placeholder.com/100/00FFFF/000000?text=Promo6_3',
        'https://via.placeholder.com/100/00FFFF/000000?text=Promo6_4',
      ],
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{promo.title}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {promo.items.map((item, index) => (
                <div key={index} className="relative h-24 w-full rounded-lg overflow-hidden">
                  <Image
                    src={item}
                    alt={`Promotion item ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            <a href="#" className="text-blue-600 hover:underline text-sm">See More.....</a>
          </div>
        ))}
      </div>
    </section>
  );
}
