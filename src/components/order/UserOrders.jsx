import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserOrders } from "../../Redux/actions/orderActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination"; // Import react-js-pagination
import { FaEye } from "react-icons/fa";

const UserOrders = () => {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    dispatch(getuserOrders);
  }, [dispatch]);

  // Calculate the index of the first and last order to display on the current page
  // const userOrders = [/* array of orders */];
  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  //     // Total number of pages
  //     const totalPages = Math.ceil(userOrders.length / ordersPerPage);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold mb-5">My Orders</h1>
        {userOrders.length > 0 ? (
          <div className="overflow-x-auto  h-screen">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Number of Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderItems.length}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      <span
                        className={` ${
                          order.orderStatus.includes("Delivered")
                            ? "text-green-500 font-bold"
                            : "text-red-500 font-bold"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/order/${order._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className=" justify-center flex items-center flex-col">
            <img src={"/images/noOrderFound.png"} alt="" />
            <Link to={"/"} className=" text-xl font-bold text-blue-400">
              Go to Home Page
            </Link>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12">
          {userOrders.length > ordersPerPage ? (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={ordersPerPage}
              totalItemsCount={userOrders.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              prevPageText="Previous"
              nextPageText="Next"
              itemClass="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-200"
              linkClass="text-blue-500 font-bold"
              activeClass="bg-gray-300" // entha page active ah irukirathanu kaata
              innerClass="inline-flex items-center space-x-2"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserOrders;
