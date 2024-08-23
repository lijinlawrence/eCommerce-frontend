import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center my-4">
      <Link to={'/shipping'} className={`flex items-center mb-2 md:mb-0 ${step1 ? "text-white font-bold" : "text-gray-500"}`}>
        <div className={`px-4 py-2 ${step1 ? "bg-orange-400" : "bg-gray-100"} rounded-l-lg`}>
          Shipping Info
        </div>
        <div className={`w-8 border-t-4 ${step1 ? "border-orange-400" : "border-gray-300"}`}></div>
      </Link>

      <Link to={'/order/confirm'} className={`flex items-center mb-2 md:mb-0 ${step2 ? "text-white font-bold " : "text-gray-500"}`}>
        <div className={`w-8 border-t-4 ${step2 ? "border-orange-500" : "border-gray-300"}`}></div>
        <div className={`px-4 py-2 ${step2 ? "bg-orange-400" : "bg-gray-100"}`}>
          Confirm Order
        </div>
        <div className={`w-8 border-t-4 ${step2 ? "border-orange-500" : "border-gray-300"}`}></div>
      </Link>

      <Link to={`/payment`} className={`flex items-center ${step3 ? "text-white font-bold" : "text-gray-500"}`}>
        <div className={`w-8 border-t-4 ${step3 ? "border-orange-500" : "border-gray-300"}`}></div>
        <div className={`px-4 py-2 ${step3 ? "bg-orange-400" : "bg-gray-100"} rounded-r-lg`}>
          Payment
        </div>
      </Link>
    </div>
  );
};

export default CheckoutSteps;
