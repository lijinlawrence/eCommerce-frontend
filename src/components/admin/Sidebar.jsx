import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaProductHunt,
  FaShoppingBasket,
  FaUsers,
  FaPlus,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white h-full ">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center  space-x-2 hover:text-gray-400 hover:bg-gray-200  py-3 rounded-lg px-2"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <div className="relative">
              <button
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                className="flex items-center justify-between hover:text-gray-400 w-full text-left hover:bg-gray-200 py-3 rounded-lg px-2"
              >
                <div className="flex items-center space-x-2">
                  <FaProductHunt />
                  <span>Product</span>
                </div>
                <IoIosArrowDown />
              </button>
              {isProductDropdownOpen && (
                <ul className="mt-2 bg-gray-700 rounded shadow-lg absolute w-full">
                  <li
                    className="hover:bg-gray-600 p-2 cursor-pointer"
                    onClick={() => {
                      navigate("/admin/products");
                      setIsProductDropdownOpen(false);
                    }}
                  >
                    <FaShoppingBasket className="inline mr-2" />
                    All
                  </li>
                  <li
                    className="hover:bg-gray-600 p-2 cursor-pointer"
                    onClick={() => {
                      navigate("/admin/products/create");
                      setIsProductDropdownOpen(false);
                    }}
                  >
                    <FaPlus className="inline mr-2" />
                    Create
                  </li>
                </ul>
              )}
            </div>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-2 hover:text-gray-400  hover:bg-gray-200  py-3 rounded-lg px-2"
            >
              <FaShoppingBasket />
              <span>Orders</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="flex items-center space-x-2 hover:text-gray-400  hover:bg-gray-200  py-3 rounded-lg px-2"
            >
              <FaUsers />
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center space-x-2 hover:text-gray-400  hover:bg-gray-200  py-3 rounded-lg px-2"
            >
              <FaUsers />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
