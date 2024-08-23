import React, { useEffect, useState } from "react";
import MetaData from "./utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/productsActions";
import Loader from "./utils/Loader";
import ProductCard from "./product/ProductCard";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, totalPoductsCount } =
    useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(currentPage);

  useEffect(() => {
    if (error) {
      return toast.error(`Error: ${error}`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
      });
    }
    dispatch(getProducts(null,null,null,null, currentPage));
  }, [dispatch, error, currentPage]);

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
          <MetaData title={"kittu home"} />
          <h1 className=" text-4xl font-bold mb-11 ">Latest Products</h1>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2  ">
            {products &&
              products.map((product) => (
                <ProductCard col={3} key={product._id} product={product} />
              ))}
          </div>
          <div className=" flex justify-center items-center mt-12">
            {totalPoductsCount > 0 && totalPoductsCount > resPerPage ? (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={totalPoductsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200" // for styling purpose
                linkClass="text-blue-500 font-bold "
                activeClass="bg-gray-300" // entha page active ah irukirathanu kaata
                innerClass="inline-flex items-center space-x-2"
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
