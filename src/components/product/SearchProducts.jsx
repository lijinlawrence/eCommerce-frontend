import React, { useEffect, useState } from "react";
import MetaData from "../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Loader from "../utils/Loader";
import ProductCard from "../product/ProductCard";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, totalPoductsCount } =
    useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
      });
    }
    dispatch(
      getProducts(keyword, priceChanged, category, rating, currentPage)
    );
  }, [dispatch, error, currentPage, keyword, priceChanged, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <MetaData title={"Search Products"} />
          <h1 className="text-4xl font-bold mb-11 text-center">
            Search Products
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Filter section */}
            <div className=" p-4">
              <h2 className="text-2xl font-bold mb-4">Filter by Price</h2>
              {/* Price Filter */}
              <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                <Slider
                  range={true}
                  marks={{
                    0: "$0",
                    1000: "$1000",
                  }}
                  min={0}
                  max={1000}
                  defaultValue={price}
                  onChange={(price) => {
                    setPrice(price);
                  }}
                  handleRender={(renderProps) => (
                    <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                      <div {...renderProps.props}></div>
                    </Tooltip>
                  )}
                />
              </div>
              <hr className="my-10" />
              {/* Category Filter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name={cat}
                        id={cat}
                        className="mr-2"
                        checked={category === cat}
                        onChange={() => {
                          setCategory(category === cat ? "" : cat);
                        }}
                      />
                      <label htmlFor={cat} className="text-lg">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="my-10" />
              {/* Ratings Filter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Ratings</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name={star}
                        id={`rating-${star}`}
                        className="mr-2"
                        checked={rating === star}
                        onChange={() => {
                          setRating(rating === star ? "":star );
                        }}
                      />
                      <label
                        htmlFor={`rating-${star}`}
                        className="text-lg flex items-center"
                      >
                        <div className="rating flex items-center">
                          <div className="stars-outer">
                            <div
                              className="stars-inner"
                              style={{ width: `${(star / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Products section */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-12">
            {totalPoductsCount > 0 && totalPoductsCount > resPerPage ? (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={totalPoductsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200"
                linkClass="text-blue-500 font-bold"
                activeClass="bg-gray-300"
                innerClass="inline-flex items-center space-x-2"
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchProducts;
