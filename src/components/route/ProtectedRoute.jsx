import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../utils/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.authState);
  if (loading) {
    return (
      <div className=" flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
