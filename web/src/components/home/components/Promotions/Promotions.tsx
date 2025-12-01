import React from 'react';
import Image from 'next/image';
import promotions from './PromotionDetails';

export default function Promotions() {
  

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
                    fill
                    style={{ objectFit: 'cover' }}
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