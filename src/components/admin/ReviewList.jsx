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
import { clearUserDeleted } from "../../Redux/slices/userSlice";
import { deleteUser, getUsers } from "../../Redux/actions/userActions";
import { deleteReview, getReviews } from "../../Redux/actions/productActions";
import { clearReviewDeleted } from "../../Redux/slices/productSlice";

const ReviewList = () => {
  const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(
    (state) => state.productState
  );
  const [productId, setProductId] = useState("");


  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);

  useEffect(() => {
    if (isReviewDeleted) {
      toast.success("Review Deleted Successfully");
      
      dispatch(getReviews(productId)) 
      dispatch(clearReviewDeleted())


    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
      return;
    }

    dispatch(getUsers);
  }, [dispatch, error, isReviewDeleted]);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId,id));
  };
  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(getReviews(productId))
    
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <h1 className="my-4 text-3xl font-bold">Review List</h1>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
             {/* review Search */}
             <div className=" flex justify-center items-center gap-3 py-3">
                <div className="col-5">
                    <form onSubmit={submitHandler}>
                        <div className="py-5">
                            <label >Product ID</label>
                            <input 
                                type="text"
                                onChange= {e => setProductId(e.target.value)}
                                value={productId}
                                className="input input-bordered w-full max-w-xs "
                                placeholder="Enter Product ID"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2 btn-sm">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {reviews.length > 0 ? (
              <>
               
               
               {/* review table */}
                <div className="overflow-x-auto">
                  <table className="table w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <thead>
                      <tr className="bg-gray-200 border-b">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Rating</th>
                        <th className="px-4 py-2 text-left">User</th>
                        <th className="px-4 py-2 text-left">Comment</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review._id} className="border-b hover:bg-base-300">
                          <td className="px-4 py-2">{review._id}</td>
                          <td className="px-4 py-2">{review.rating}</td>
                          <td className="px-4 py-2">{review.user.name}</td>
                          <td className="px-4 py-2">{review.comment}</td>
                          <td className="px-4 py-2">
                            <Fragment>
                              <button
                                onClick={(e) => deleteHandler(e, review._id)}
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
                  {reviews.length > reviewsPerPage ? (
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={reviewsPerPage}
                      totalItemsCount={users.length}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      prevPageText="Previous"
                      nextPageText="Next"
                      itemClass="join-item btn btn-square btn-md w-24"
                      linkClass="join-item"
                      activeClass="join-item bg-primary btn-active text-white"
                      innerClass="join"
                    />
                  ) : null}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center flex-col">
              
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

export default ReviewList;
