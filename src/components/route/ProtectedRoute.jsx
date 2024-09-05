import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../utils/Loader";

const ProtectedRoute = ({ children,isAdmin }) => {
  const { isAuthenticated, loading,user } = useSelector((state) => state.authState);

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
    if(user.role !== 'admin' && isAdmin === true){
      return <Navigate to="/" />
    }
    return children;
  }
};

export default ProtectedRoute;
