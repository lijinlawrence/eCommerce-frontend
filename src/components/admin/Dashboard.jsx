import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAdminProducts } from "../../Redux/actions/productsActions";
import { getUsers } from "../../Redux/actions/userActions";
import { adminOrdersAction } from "../../Redux/actions/orderActions";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, []);

  let outOfStock = 0;
  if (products.length > 0) {
    // outOfStock = products.filter((product) => product.stock === 0).length
    products.forEach((product) => {
      if (product.stock === 0) {
        // outOfStock+=1
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.map((order) => {
      totalAmount += order.totalPrice;
    });
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <h1 className="text-2xl font-bold my-4">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-primary text-white rounded-lg shadow-md p-4 flex justify-center items-center">
            <div className="text-center text-lg font-semibold">
              Total Amount
              <br /> <b>${totalAmount.toFixed(2)}</b>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div className="text-center text-lg font-semibold">
              Products
              <br /> <b>{products.length}</b>
            </div>
            <Link className="text-white mt-2 text-sm" to="/admin/products">
              <div className="flex justify-between items-center">
                <span>View Details</span>
                <i className="fa fa-angle-right"></i>
              </div>
            </Link>
          </div>

          <div className="bg-red-500 text-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div className="text-center text-lg font-semibold">
              Orders
              <br /> <b>{adminOrders.length}</b>
            </div>
            <Link className="text-white mt-2 text-sm" to="/admin/orders">
              <div className="flex justify-between items-center">
                <span>View Details</span>
                <i className="fa fa-angle-right"></i>
              </div>
            </Link>
          </div>

          <div className="bg-blue-500 text-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div className="text-center text-lg font-semibold">
              Users
              <br /> <b>{users.length}</b>
            </div>
            <Link className="text-white mt-2 text-sm" to="/admin/users">
              <div className="flex justify-between items-center">
                <span>View Details</span>
                <i className="fa fa-angle-right"></i>
              </div>
            </Link>
          </div>

          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-4 flex justify-center items-center">
            <div className="text-center text-lg font-semibold">
              Out of Stock
              <br /> <b>{outOfStock}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
