'use client'
import React, { useState } from 'react'
import Gallery from './Gallery'
import ThumbnailCarousel from './ThumbnailCarousel'

export default function ProductMediaClient({ product, initialIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const images = product?.images ?? (product?.image ? [product.image] : [])
  const activeImage = images?.[activeIndex] ?? images?.[0] ?? ''

  return (
    <div>
      <Gallery activeImage={activeImage} product={product} />
      <ThumbnailCarousel product={{ name: product.name, images: images }} activeImageIndex={activeIndex} setActiveImageIndex={setActiveIndex} />
    </div>
  )
}
