import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While checking auth (important for refresh)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
