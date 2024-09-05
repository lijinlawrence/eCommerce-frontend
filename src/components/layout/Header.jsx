import React from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/userActions"; // Ensure this action exists
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  //{ items:cartItems } - rename

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar flex justify-around w-full mx-auto bg-gray-100 shadow-lg py-1 px-2 z-10 sticky top-0">
      <Link to={"/"}>
        <img src={logo} alt="Logo" width={90} />
      </Link>
      <Search />
      <div className="flex items-center justify-center space-x-2">
        {isAuthenticated ? (
          <div className="relative group">
            <button className="flex items-center text-xs focus:outline-none">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-1"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 rounded-full mr-1" />
              )}
              <span className="text-sm font-semibold">
                {" "}
                {user?.name || "User"}
              </span>
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200">
              {user?.role === "admin" && (
                <Link
                  to={"/admin/dashboard"}
                  className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to={"/myProfile"}
                className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs"
              >
                Profile
              </Link>
              <Link
                to={"/myOrders"}
                className="block px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs"
              >
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-accent text-xs px-3 py-1">
            Login
          </Link>
        )}
        <Link className=" font-bold px-3 py-1" to={"/cart"}>
          <div className="badge badge-secondary ">{cartItems.length}</div>
          <FaShoppingCart className=" text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
