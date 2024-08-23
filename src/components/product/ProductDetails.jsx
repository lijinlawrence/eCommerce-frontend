import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
import MetaData from "../utils/MetaData";
import { toast } from "react-toastify";
import { addCartItem } from "../../Redux/actions/cartActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productState
  );
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock === 0 || product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleCart =(productId, quantity)=>{
      dispatch(addCartItem(productId,quantity))
  }

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <MetaData title={product.name} />
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 p-4">
            <div className="flex justify-center items-center">
              <Carousel autoPlay interval={3000} infiniteLoop showThumbs={true}>
                {product.images &&
                  product.images.map((img) => (
                    <div key={img._id} style={{ width: "70%" }}>
                      <img src={img.image} alt={product.name} />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="flex flex-col p-4">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p>Product # {product._id}</p>
              <hr className="mt-3" />
              <div className="mt-5 flex items-center">
                <div className="rating relative flex items-center">
                  <div className="stars-outer">
                    <div
                      className="stars-inner"
                      style={{ width: `${(product.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="ml-2">({product.numOfReviews} reviews)</p>
                </div>
              </div>
              <hr className="mt-5" />
              <p className="font-bold text-3xl text-black mt-5">
                ${product.price}
              </p>
              <div className="mt-5 flex items-center">
                <button
                  className="bg-red-500 p-2 rounded-xl"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-10 text-center mx-2 border count border-gray-300"
                  value={quantity}
                  readOnly
                />
                <button
                  className="bg-green-500 p-2 rounded-xl"
                  onClick={increaseQuantity}
                >
                  +
                </button>
                <button
                  className="btn btn-accent ml-5"
                  disabled={product.stock === 0}
                  onClick={()=>handleCart(product._id, quantity)} 
                >
                  Add to Cart
                </button>
              </div>
              <hr className="mt-5" />
              <p className="text-black mt-5">
                Status:{" "}
                <span
                  className={`${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <hr className="mt-5" />
              <p className="text-black font-bold mt-5">Description</p>
              <span className="mt-3 text-black">{product.description}</span>
              <hr />
              <p className="text-black mt-5">
                Sold By:{" "}
                <span className="text-black font-bold">{product.seller}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
