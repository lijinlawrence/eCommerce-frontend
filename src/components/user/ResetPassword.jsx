import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, loginFail } from "../../Redux/slices/authSlice";
import MetaData from "../utils/MetaData";

const ResetPassword = () => {
  // State to hold user input
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  // Effect to handle authentication and error state
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Login successful");
      return
    }

    if (error) {
      toast.error(error);
      dispatch(clearError(null));
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    dispatch(login(email, password));
  };

  return (
    <>
      {/* Meta data for the page */}
      <MetaData title={"Login Page"} />
      
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          
          {/* Login form */}
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Email input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Password
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            
            {/* Password input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
               Confirm Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            
            {/* Submit button with loading state */}
            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>
          
          {/* Navigation links */}
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              Create one
            </Link>
            <br />
            <Link
              to='/password/forget'
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
