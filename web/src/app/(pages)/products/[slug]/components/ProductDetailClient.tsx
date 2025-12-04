'use client';
import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function ProductDetailClient({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? 'default');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');

  const handleAdd = () => {
    const item = {
      id: String(product.uniq_id ?? product.pid ?? product._id),
      name: product.name,
      price: Number(product.currentPrice ?? product.oldPrice ?? 0) || 0,
      imageUrl: product.images?.[0] ?? product.image ?? '',
      color: selectedColor,
      size: selectedSize,
      quantity: Number(qty) || 1,
    };
    addToCart(item);
  };

  return (
    <div className="space-y-4">
      {product.colors?.length ? (
        <div>
          <label className="block text-sm">Color</label>
          <div className="flex gap-2 mt-2">
            {product.colors.map((c, idx) => (
              <button key={idx} onClick={() => setSelectedColor(c)} className={`px-3 py-1 border ${selectedColor === c ? 'border-blue-600' : 'border-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {product.sizes?.length ? (
        <div>
          <label className="block text-sm">Size</label>
          <div className="flex gap-2 mt-2">
            {product.sizes.map((s, idx) => (
              <button key={idx} onClick={() => setSelectedSize(s)} className={`px-3 py-1 border ${selectedSize === s ? 'border-blue-600' : 'border-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <label className="text-sm">Qty</label>
        <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value ?? 1))} className="w-20 border px-2 py-1 rounded" />
      </div>

      <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
    </div>
  );
}
