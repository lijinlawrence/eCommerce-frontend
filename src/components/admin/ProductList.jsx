import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Loader from "../utils/Loader";
import { clearError } from "../../Redux/slices/authSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getAdminProducts } from "../../Redux/actions/productsActions";
import { deleteProduct } from "../../Redux/actions/productActions";
import { clearProductCreated } from "../../Redux/slices/productSlice";



const ProductList = () => {
  const { products = [], loading = true, error } = useSelector(state => state.productsState)
  const {error:productError , isProductDeleted } = useSelector(state => state.productState)
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
     if(isProductDeleted){
      toast.success("Product Deleted Successfully");
      dispatch(clearProductCreated());
     }

    if (error ||productError) {
      toast.error(error);
      dispatch(clearError());
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error,isProductDeleted,productError]);

  const setProducts = () => {
    return products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <h1 className="my-4 text-3xl font-bold">Product List</h1>
        {loading ? (
           <div className="flex justify-center items-center h-screen">
           <Loader />
         </div>
        ) : (
          <Fragment>
            {products.length > 0 ? (
              <>
                <div className="overflow-x-auto ">
                  <table className="table w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <thead>
                      <tr className="bg-gray-200 border-b">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Stock</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {setProducts().map(product => (
                        <tr key={product._id} className="border-b hover:bg-base-300">
                          <td className="px-4 py-2">{product._id}</td>
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2 ">${product.price}</td>
                          <td className="px-4 py-2">{product.stock}</td>
                          <td className="px-4 py-2">
                            <Fragment>
                              <Link
                                to={`/admin/product/update/${product._id}`}
                                className="btn btn-primary btn-sm mr-2"
                              >
                               <FaEdit />

                              </Link>
                              <button
                                onClick={e => deleteHandler(e, product._id)}
                                className="btn btn-error btn-sm"
                              >
                                <MdDelete className="text-xl" />

                              </button>
                            </Fragment>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4">
                    {products.length>productsPerPage?
                      <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={productsPerPage}
                      totalItemsCount={products.length}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      prevPageText="Previous"
                      nextPageText="Next"
                      itemClass="join-item btn btn-square btn-md w-24"
                      linkClass="join-item"
                      activeClass="join-item bg-primary  btn-active text-white"
                      innerClass="join"
                    />:null
                }
                
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <img src={"/images/noProductsFound.png"} alt="No products found" />
                <Link to={"/"} className="text-xl font-bold text-blue-400">
                  Go to Home Page
                </Link>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProductList;
