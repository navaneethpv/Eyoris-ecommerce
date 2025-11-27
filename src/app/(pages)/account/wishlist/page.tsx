'use client'
import React, { useState } from "react";
import AccountLinks from "../components/AccountLinks";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const [items, setItems] = useState(
    [
      { id: '1', name: 'Cozy Bath Mat', price: 299, color: 'Black', image: '/assets/Images/product1.png' },
      { id: '2', name: 'Memory Foam Kitchen Mat', price: 499, color: 'Beige', image: '/assets/Images/product1.png' },
      { id: '3', name: 'Decorative Basket', price: 799, color: 'Brown', image: '/assets/Images/product1.png' },
      { id: '4', name: 'Soft Rug', price: 1299, color: 'Blue', image: '/assets/Images/product1.png' },
      { id: '5', name: 'Cozy Pillow', price: 199, color: 'Grey', image: '/assets/Images/product1.png' },
      { id: '6', name: 'Storage Box', price: 349, color: 'Natural', image: '/assets/Images/product1.png' },
    ]
  );

  const [sort, setSort] = useState('popular');

  const clearAll = () => setItems([]);
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const addToCart = (item) => {
    // wire to cart store if you have one
    console.log('Add to cart', item);
    // provide immediate feedback
    removeItem(item.id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">Saved items for later — move them to cart when ready.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border-gray-200 p-2">
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button onClick={clearAll} className="ml-2 px-4 py-2 bg-red-50 text-red-600 rounded-md border border-red-100">Clear all</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AccountLinks />
          </div>
        </aside>

        <main className="lg:col-span-3">
          {items.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <Image src="/assets/Images/product1.png" alt="empty" width={160} height={120} className="mx-auto mb-6 opacity-70" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-sm text-gray-500 mb-6">Save items you love to come back to them later.</p>
              <div className="flex justify-center gap-3">
                <Link href="/shop" className="px-5 py-2 bg-blue-600 text-white rounded-md">Start shopping</Link>
                <Link href="/" className="px-5 py-2 border rounded-md">Continue browsing</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-sm text-gray-600 mb-3">Showing {items.length} saved items</div>

              {/* scrollable list container */}
              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-50 transition">
                    <div className="w-20 h-20 relative shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="truncate">
                          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                          <div className="text-xs text-gray-500 mt-1 truncate">Color: {item.color}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-semibold">₹{item.price}</div>
                          <div className="text-xs text-gray-400">incl. taxes</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <button onClick={() => addToCart(item)} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add to cart</button>
                        <button onClick={() => removeItem(item.id)} className="px-3 py-2 border rounded-md text-gray-600">Remove</button>
                        <button className="ml-auto text-sm text-gray-500">Move to list</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
