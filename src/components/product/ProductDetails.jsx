import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getProduct } from "../../Redux/actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
import MetaData from "../utils/MetaData";
import { toast } from "react-toastify";
import { addCartItem } from "../../Redux/actions/cartActions";
import { FaRegStar, FaStar } from "react-icons/fa"; // Importing the star icon
import { clearIsReviewed, clearProduct } from "../../Redux/slices/productSlice";
import ProductReview from "./ProductReview";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error, isReviewed } = useSelector(
    (state) => state.productState
  );
  const { user } = useSelector((state) => state.authState);

  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const increaseQuantity = () => {
    if (product.stock === 0 || product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleCart = (productId, quantity) => {
    dispatch(addCartItem(productId, quantity));
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  useEffect(() => {
    if (isReviewed) {
      handleClose();
      toast.success("Review Submitted successfully");
      dispatch(clearIsReviewed())
    }
    if (error) {
      toast.error(error);
      return;
    }

    if (!product?._id || isReviewed) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewed, error]);

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
                <div className="flex items-center">
                  {/* Render stars */}
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="text-yellow-400">
                      {index < product.ratings ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                  <p className="ml-2 text-gray-600">
                    ({product.numOfReviews} reviews)
                  </p>
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
                  onClick={() => handleCart(product._id, quantity)}
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
              {user ? (
                <button
                  onClick={handleShow}
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                >
                  Add Your Review
                </button>
              ) : (
                <div className="alert alert-error mt-5">
                  Login to Post Review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  {/* Modal */}
                  {show && (
                    <div className="modal modal-open">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Submit Review</h3>
                        <div>
                          <ul className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <li
                                key={star}
                                value={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer ${
                                  star <= rating
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                }`}
                                onMouseOver={(e) =>
                                  e.currentTarget.classList.add(
                                    "text-yellow-300"
                                  )
                                }
                                onMouseOut={(e) =>
                                  e.currentTarget.classList.remove(
                                    "text-yellow-300"
                                  )
                                }
                              >
                                <FaStar /> {/* Using React Icons */}
                              </li>
                            ))}
                          </ul>

                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            name="review"
                            id="review"
                            className="textarea textarea-bordered w-full mt-3"
                          ></textarea>
                          <div className=" flex gap-2 justify-end">
                            <button
                              disabled={loading}
                              onClick={reviewHandler}
                              className="btn btn-primary my-3 float-right px-4 text-white"
                            >
                              Submit
                            </button>

                            <button
                              onClick={handleClose}
                              className="btn  my-3 float-right px-4 "
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ProductReview reviews={product.reviews} />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
