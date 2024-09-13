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
      return toast.error(`Error: ${error}`);
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
          <div className=" flex justify-center items-center mt-12 join">
            {totalPoductsCount > 0 && totalPoductsCount > resPerPage ? (
              <div className="">
                 <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={totalPoductsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="join-item btn btn-square btn-md w-24  "  // Adjust size and button styling
                  linkClass="join-item "
                  activeClass="join-item bg-primary  btn-active text-white" // Highlight active item
                  innerClass="join " // Container class for all items
                />
              </div>
             
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
