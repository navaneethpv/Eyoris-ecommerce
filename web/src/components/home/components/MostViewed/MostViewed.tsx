'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/index'
import { useCartStore } from '@/store/useCartStore'
import mostViewed from '@/hooks/mostViewed'
import Link from 'next/link'

const MostViewed: React.FC = () => {
  // select only the action to avoid unnecessary re-renders
  const addToCart = useCartStore((s) => s.addToCart)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const products: Product[] = mostViewed() || []

  const handleNext = () => {
    if (currentIndex < Math.max(0, products.length - 5)) {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  const handleAddtoCart = (product: Product) => {
    let oldPrice = 0
    let currentPrice = 0

    if (typeof product.oldPrice === 'string' && product.oldPrice !== 'N/A') {
      const parsed = parseFloat(product.oldPrice)
      oldPrice = Number.isFinite(parsed) ? parsed : 0
    } else if (typeof product.oldPrice === 'number') {
      oldPrice = product.oldPrice
    }

    if (typeof product.currentPrice === 'string' && product.currentPrice !== 'N/A') {
      const parsed = parseFloat(product.currentPrice)
      currentPrice = Number.isFinite(parsed) ? parsed : 0
    } else if (typeof product.currentPrice === 'number') {
      currentPrice = product.currentPrice
    }

    const itemToAdd = {
      id: String(product.uniq_id ?? product._id ?? product.pid ?? ''),
      name: product.name ?? 'Product',
      price: oldPrice,
      discountPrice: currentPrice > 0 && currentPrice < oldPrice ? currentPrice : undefined,
      imageUrl: product.image ?? '/assets/Images/no-image.png',
      color: 'default',
      quantity: 1,
    }

    addToCart(itemToAdd)
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Most Viewed Products</h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {products.map((product) => {
              const p = product
              const slug = String(p.uniq_id ?? p.pid ?? p._id ?? p.id ?? '')
              return (
                <Link href={`/products/${slug}`} key={slug} className="w-1/5 shrink-0 px-2 block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="relative h-44 w-full">
                      <Image
                        src={product.image ?? '/assets/Images/no-image.png'}
                        alt={product.name ?? 'Product'}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="rounded-t-lg"
                      />
                    </div>

                    <div className="p-4 flex flex-col grow">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 min-h-10">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < Number(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({String(product.reviews ?? '')})</span>
                      </div>

                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-lg font-bold text-gray-900">₹{product.currentPrice}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                        {product.discount && <span className="text-sm text-green-600">{product.discount}</span>}
                      </div>

                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 mt-auto"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddtoCart(product); }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= Math.max(0, products.length - 5)}
            className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
export default MostViewed