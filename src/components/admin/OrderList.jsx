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
import { clearOrderDeleted } from "../../Redux/slices/orderSlice";
import {
  adminDeleteOrder,
  adminOrdersAction,
} from "../../Redux/actions/orderActions";

const OrderList = () => {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch(clearOrderDeleted());
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
      return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  const setOrders = () => {
    return adminOrders.slice(
      (currentPage - 1) * ordersPerPage,
      currentPage * ordersPerPage
    );
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(adminDeleteOrder(id));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //   const totalPages = Math.ceil(adminOrders.length / ordersPerPage);

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <h1 className="my-4 text-3xl font-bold">Order List</h1>
        {loading ? (
            <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <Fragment>
            {adminOrders.length > 0 ? (
              <>
                <div className="overflow-x-auto ">
                  <table className="table w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <thead>
                      <tr className="bg-gray-200 border-b">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Number of Items</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {setOrders().map((order) => (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-base-300"
                        >
                          <td className="px-4 py-2">{order._id}</td>
                          <td className="px-4 py-2">
                            {order.orderItems.length}
                          </td>
                          <td className="px-4 py-2 ">${order.totalPrice}</td>
                          <td
                            className={`px-4 py-2 ${
                              order.orderStatus == "Processing"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {order.orderStatus}
                          </td>
                          <td className="px-4 py-2">
                            <Fragment>
                              <Link
                                to={`/admin/orders/update/${order._id}`}
                                className="btn btn-primary btn-sm mr-2"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={(e) => deleteHandler(e, order._id)}
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
                  {adminOrders.length > ordersPerPage ? (
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={ordersPerPage}
                      totalItemsCount={adminOrders.length}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      prevPageText="Previous"
                      nextPageText="Next"
                      itemClass="join-item btn btn-square btn-md w-24"
                      linkClass="join-item"
                      activeClass="join-item bg-primary  btn-active text-white"
                      innerClass="join"
                    />
                  ) : null}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <img
                  src={"/images/noProductsFound.png"}
                  alt="No products found"
                />
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

export default OrderList;
