import React, { useState } from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/userActions"; // Ensure this action exists
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  //{ items:cartItems } - rename

  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the menu


  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close state
  };

  return (
    <div className="navbar flex justify-around w-full mx-auto bg-gray-100 shadow-lg py-1 px-2 z-10 sticky top-0">
      <div>
      <Link to={"/"}>
        <img src={logo} alt="Logo" width={90} />
      </Link>
      </div>

      <div className=" hidden md:flex">
      <Search />

      </div>
     
      <div className="md:flex items-center hidden justify-center space-x-2">
        {isAuthenticated ? (
          <div className="relative group">
            <button className="flex items-center text-xs focus:outline-none ">
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

       {/* Mobile Menu: Burger Icon */}
       <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-2xl" /> // Close icon when menu is open
          ) : (
            <FaBars className="text-2xl" /> // Burger icon when menu is closed
          )}
        </button>
      </div>

      {/* Mobile Menu: Sliding Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex flex-col px-2 space-y-4">
          {/* Close Button */}
          <button className="self-end" onClick={toggleMenu}>
            <FaTimes className="text-2xl" />
          </button>

          {/* Links at the top in mobile view */}
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link
                  to={"/admin/dashboard"}
                  className="block text-gray-700 hover:bg-gray-200 px-3 py-1"
                  onClick={toggleMenu} // Close menu on link click
                >
                  Dashboard
                </Link>
              )}
              <Link
                to={"/myProfile"}
                className="block text-gray-700 hover:bg-gray-200 px-3 py-1"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to={"/myOrders"}
                className="block text-gray-700 hover:bg-gray-200 px-3 py-1"
                onClick={toggleMenu}
              >
                Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu(); // Close menu after logout
                }}
                className="block text-gray-700 hover:bg-gray-200 px-3 py-1 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-accent text-xs px-3 py-1"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
          {/* Search in mobile view */}
          <Search />
          {/* Cart */}
          <Link
            to={"/cart"}
            className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-200"
            onClick={toggleMenu}
          >
            <span>Cart</span>
            <div>
           
            <div className="badge badge-secondary ">{cartItems.length}</div>
            <FaShoppingCart />
            </div>
           

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
