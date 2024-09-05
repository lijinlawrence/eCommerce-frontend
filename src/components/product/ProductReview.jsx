import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductReview = ({ reviews }) => {
  return (
    <div className="">
      <h3 className="text-xl font-bold mb-2">Other's Reviews:</h3>
      <hr className="mb-4" />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-white  rounded-lg p-4 my-3">
            <div className="flex items-center  mb-2">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="text-yellow-400">
                  {index < review.rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <p className="font-semibold text-gray-800 ml-2">by {review.user.name}</p>

            <p className="text-gray-700">{review.comment}</p>
            <hr className="mt-4" />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReview;
