"use client";
import React from "react";
import Link from "next/link";
import { useCartStore } from '@/store/useCartStore';
const CartSection = () => {
  const items = useCartStore((s) => s.items ?? []);
   return (
     <div>
       <Link
         href={"cart"}
         className="flex items-center text-gray-700 hover:text-blue-600 relative"
       >
         <svg
          className="w-6 h-6 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <div className="absolute -top-2 right-6 w-6 h-6 flex items-center justify-center">
          <span className="text-[11px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>
         Cart
       </Link>
     </div>
   );
 };

 export default CartSection;
