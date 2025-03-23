import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevent flicker when checking auth status

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
