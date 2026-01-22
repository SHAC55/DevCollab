import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  // while checking token (important on refresh)
  if (loading) return null; // or loader

  // if token exists → allow route
  if (token) {
    return <Outlet />;
  }

  // if not logged in → redirect to sign-in
  return <Navigate to="/sign-in" replace state={{ from: location }} />;
};

export default ProtectedRoute;
