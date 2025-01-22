import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router";
import { useLocation } from "react-router";

const AuthLayout = () => {
  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);

  let location = useLocation();
  if (!user && isAuthChecked) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AuthLayout;
