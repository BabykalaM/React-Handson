import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/reducer";

const ProtectedLogin = () => {
  const [state, dispatch] = useAuth();
  const location = useLocation();
  console.log(state);
  const token = localStorage.getItem("token");
  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedLogin;
