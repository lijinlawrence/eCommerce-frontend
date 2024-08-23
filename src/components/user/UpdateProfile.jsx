import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearIsUpdated,
  updateProfileFail,
} from "../../Redux/slices/authSlice";
import MetaData from "../utils/MetaData";
import defaultAvatar from "../../assets/images/default_avatar.png";

const UpdateProfile = () => {
  const { loading, error, isUpdated, user } = useSelector(
    (state) => state.authState
  );
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || defaultAvatar
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdated) {
      navigate("/myProfile");
      toast.success("Profile Updated Successfully");
      dispatch(clearIsUpdated());
    }

    if (error) {
      toast.error(error);
      dispatch(updateProfileFail(null));
    }
    return;
  }, [isUpdated, error, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    dispatch(updateProfile(formData));
  };

  return (
    <>
      <MetaData title={"Update Profile"} />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Update Profile</h1>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                disabled
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="avatar"
              >
                Profile Avatar
              </label>
              <div className="flex gap-5 justify-center items-center">
                <div className="flex justify-center">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full file-input px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
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

export default UpdateProfile;
