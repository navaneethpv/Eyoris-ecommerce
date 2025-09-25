import React from 'react';
import Image from 'next/image';

export default function Promotions() {
  const promotions = [
    {
      id: "promo-fashion-1",
      title: "Alisha's Fashion Picks: Shorts & Apparel",
      items: [
        "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg",
        "http://img5a.flixcart.com/image/short/6/2/h/altght-11-alisha-38-original-imaeh2d5uq9thnyg.jpeg",
        "http://img6a.flixcart.com/image/swimsuit/5/v/9/carrel-sw-3091-black-white01-carrel-4xl-original-imaehyzm2sywfavb.jpeg",
        "http://img5a.flixcart.com/image/fabric/h/k/a/r-c-lehe-bt-indcrown-1000x1000-imaejbczsqzjrbfd.jpeg"
      ]
    },
    {
      id: "promo-home-2",
      title: "FabHomeDecor: Sofa Beds & Home Accents",
      items: [
        "http://img6a.flixcart.com/image/sofa-bed/j/f/y/fhd112-double-foam-fabhomedecor-leatherette-black-leatherette-1100x1100-imaeh3gemjjcg9ta.jpeg",
        "http://img5a.flixcart.com/image/artificial-plant/g/s/n/bbajc218-bengal-blooms-original-imaeg8ety3zfcnvw.jpeg",
        "http://img5a.flixcart.com/image/vanity-box/8/5/t/j-635-bulaky-vanity-case-1100x1100-imadzy6atzfswnag.jpeg",
        "http://img5a.flixcart.com/image/bottle/j/m/m/av004bgr-freelance-350-vacuum-bottles-1000x1100-imaegykdk6ytzrzz.jpeg"
      ]
    },
    {
      id: "promo-footwear-3",
      title: "AW Bellies & Footwear Collection",
      items: [
        "http://img5a.flixcart.com/image/shoe/7/z/z/red-as-454-aw-11-original-imaeebfwsdf6jdf6.jpeg",
        "http://img6a.flixcart.com/image/shoe/b/p/n/pink-200db202-dilli-bazaaar-10-original-imaeh2zz4x6hnuwf.jpeg",
        "http://img5a.flixcart.com/image/shoe/s/g/m/black-r998-22-ladela-38-original-imaega8phqh6tf4e.jpeg",
        "http://img5a.flixcart.com/image/shoe/p/f/h/black-sfwf0377-style-foot-44-original-imaeh4cxasyrdtjr.jpeg"
      ]
    },
    {
      id: "promo-petcare-4",
      title: "Sicons Pet Care: Shampoos & Toys",
      items: [
        "http://img5a.flixcart.com/image/pet-shampoo/r/j/5/sh-df-14-sicons-500-1100x1100-imaeh3hfvav85tva.jpeg",
        "http://img5a.flixcart.com/image/pet-shampoo/r/j/5/sh-df-14-sicons-500-original-imaeh3hfvav85tva.jpeg",
        "http://img6a.flixcart.com/image/pet-shampoo/c/c/d/sh-df-07-sicons-200-1100x1100-imaeh3kvn25fznjt.jpeg",
      "http://img5a.flixcart.com/image/pet-shampoo/r/j/5/sh-df-14-sicons-500-1100x1100-imaeh3hfvav85tva.jpeg"
    ]
  },
  {
    id: "promo-lifestyle-5",
      title: "Freelance Bottles & Shopmania Stationery",
      items: [
        "http://img5a.flixcart.com/image/bottle/j/m/m/av004bgr-freelance-350-vacuum-bottles-1000x1100-imaegykdk6ytzrzz.jpeg",
        "http://img5a.flixcart.com/image/diary-notebook/g/y/y/shopmania-nb00664-1100x1100-imaej4wguh2c6dfb.jpeg",
        "http://img5a.flixcart.com/image/diary-notebook/e/g/h/shopmania-nb00678-1100x1100-imaej4whhbgzn5z3.jpeg",
        "http://img5a.flixcart.com/image/packaging-security-bag/6/y/q/8-x-10-inches-security-bags-without-pod-jacket-courier-bag-1100x1100-imaegbjpxtthuyzc.jpeg"
      ]
    },
    {
      id: "promo-kids-6",
      title: "Oye & Dongli Kids' Apparel",
      items: [
        "http://img6a.flixcart.com/image/dungaree-romper/9/z/d/bpr0015-oye-1-2-years-original-imaeeyu6ashttgyv.jpeg",
        "http://img5a.flixcart.com/image/t-shirt/w/x/t/dlhbb445-beige-black-gyellow-purple-dongli-10-11-years-original-imaehb54gxhchxcd.jpeg",
        "http://img5a.flixcart.com/image/t-shirt/f/n/f/dlhbb445-beige-black-gyellow-purple-dongli-15-16-years-original-imaehb55kjd6g4kg.jpeg",
        "http://img6a.flixcart.com/image/t-shirt/g/y/5/dlhbb445-beige-black-gyellow-purple-dongli-12-13-years-original-imaehb54re656maf.jpeg"
      ]
    }
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
                    objectFit="contain"
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

