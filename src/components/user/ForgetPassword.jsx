import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, login } from "../../Redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, loginFail } from "../../Redux/slices/authSlice";
import MetaData from "../utils/MetaData";

const ForgetPassword = () => {
  // State to hold user input
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.authState);

  // Effect to handle authentication and error state
  useEffect(() => {
    if (message) {
      toast.success(message);
      return;
    }

    if (error) {
      toast.error(error);
      dispatch(clearError(null));
      return;
    }
  }, [error, dispatch, message]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    dispatch(forgetPassword(formData));
  };

  return (
    <>
      {/* Meta data for the page */}
      <MetaData title={"Login Page"} />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Forget Password</h1>

          {/* Login form */}
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Email input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Submit button with loading state */}
            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Loading..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
