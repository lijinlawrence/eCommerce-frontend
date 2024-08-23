import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearIsUpdated, updateProfileFail } from "../../Redux/slices/authSlice";
import MetaData from "../utils/MetaData";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateProfilePassword = () => {
  const { loading, error, isUpdated } = useSelector((state) => state.authState);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(updateProfileFail(null));
    }

    if (isUpdated) {
      navigate("/myProfile");
      toast.success("Password Updated Successfully");
      setPassword({
        oldPassword: "",
        newPassword: "",
      });
      dispatch(clearIsUpdated())
    }
  }, [error, isUpdated, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", password.oldPassword);
    formData.append("newPassword", password.newPassword);
    dispatch(changePassword(formData));
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <MetaData title={"Update Password"} />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Update Password</h1>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={password.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={toggleOldPasswordVisibility}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePassword;
