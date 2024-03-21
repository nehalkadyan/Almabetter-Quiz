import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthPrivate = () => {
  // accessing the current user from redux store through useSelector hook
  const { currentUser } = useSelector((state) => state.user);
  // navigating to homepage if currentUser is null
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default AuthPrivate;
