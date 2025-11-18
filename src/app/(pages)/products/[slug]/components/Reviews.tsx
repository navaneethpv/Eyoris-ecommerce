import React from "react";

interface ReviewsProps {
    product: {
        reviews?: { id: number; author: string; rating: number; comment: string }[];
    };
    StarRow: React.FC<{ rating: number }>;
    setRating: (rating: number) => void;
    rating: number;
    comment: string;
    setComment: (comment: string) => void;
    handleAddReview: () => void;
}

const Reviews:React.FC <ReviewsProps> = ({ product, StarRow, setRating, rating, comment, setComment, handleAddReview }) => {
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {product.reviews && product.reviews.length === 0 ? (
              <p className="text-gray-600">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              product.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="mb-4 p-4 border border-gray-100 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{review.author}</div>
                      <div className="text-sm text-gray-500">•</div>
                      <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <StarRow rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>

          <div>
            <div className="p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold mb-3">Leave a Review</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="block w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => {
                    setComment("");
                    setRating(0);
                  }}
                  className="px-4 py-2 border rounded-md"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
