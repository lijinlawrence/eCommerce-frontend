import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product._id}
      className="bg-white p-5 rounded-lg shadow-md w-full sm:w-72 mx-auto"
    >
      <img
        src={product.images[0].image}
        alt={product.name}
        className="w-full h-[50%] object-cover rounded-lg"
      />
      <div className="mt-5">
        <Link to={`/product/${product._id}`}>
          <h1 className="text-xl font-bold hover:text-blue-700">
            {product.name}
          </h1>
        </Link>
        <div className="rating flex items-center mt-2">
          <div className="stars-outer">
            <div
              className="stars-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-gray-600">
            ({product.numOfReviews} reviews)
          </span>
        </div>
        <p className="text-xl font-bold text-gray-800 mt-4">${product.price}</p>
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-primary mt-5 w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductCard