'use client'
import React, { useState } from 'react'

export default function Reviews({ product }: { product: any }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [localReviews, setLocalReviews] = useState(Array.isArray(product.reviews) ? product.reviews : [])

  const handleAddReview = () => {
    if (!comment.trim() || rating === 0) {
      alert('Please provide a rating and a comment.')
      return
    }
    const newReview = { id: localReviews.length + 1, author: 'Anonymous', rating, comment }
    setLocalReviews((prev: any) => [...prev, newReview])
    setComment('')
    setRating(0)
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Reviews</h3>
      </div>

      {localReviews.map((review: any) => (
        <div key={review.id} className="mb-4 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{review.author}</h4>
              <p className="text-sm text-gray-500">Rating: {review.rating}</p>
            </div>
            <div className="text-sm text-gray-500">{review.id}</div>
          </div>
          <p className="mt-2 text-gray-600">{review.comment}</p>
        </div>
      ))}

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold mb-2">Add a review</h4>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm">Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border px-2 py-1 rounded">
            <option value={0}>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full border rounded p-2 mb-2" />
        <button onClick={handleAddReview} className="px-4 py-2 bg-blue-600 text-white rounded">Submit review</button>
      </div>
    </div>
  )
}
