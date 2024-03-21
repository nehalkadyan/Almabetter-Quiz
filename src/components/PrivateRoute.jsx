import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  // accessing currentUser
  const { currentUser } = useSelector((state) => state.user);

  // condition to redirect the user to sign in page in case not logged in
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
