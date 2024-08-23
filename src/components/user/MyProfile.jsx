import React from "react";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";


const MyProfile = () => {
  const { user } = useSelector((state) => state.authState);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <div className="flex justify-center items-center flex-col space-y-6">
          <img
            src={user?.avatar ?? defaultAvatar}
            alt="avatar"
            className="w-40 h-40 md:w-80 md:h-80 rounded-full"
          />
          <Link to='/myProfile/update' className="btn btn-wide bg-green-700 text-white btn-md">
          <CiEdit className=" text-lg" />
          Edit Profile
          </Link>
        </div>
        <div className="flex items-start flex-col space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Name</h1>
            <p className="text-lg md:text-xl">{user?.name}</p>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Email</h1>
            <p className="text-lg md:text-xl">{user?.email}</p>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Created At</h1>
            <p className="text-lg md:text-xl">
              {String(user?.createdAt).substring(0, 10)}
            </p>
          </div>
          <div className="space-y-4">
            <Link to={'/myOrders'} className="btn bg-red-500 text-white btn-wide">
              My Orders
            </Link>
            <Link to='/myProfile/update/password' className="btn bg-blue-500 text-white btn-wide">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
