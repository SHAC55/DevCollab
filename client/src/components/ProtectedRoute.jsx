// src/routes/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { token } = useAuth;

  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
