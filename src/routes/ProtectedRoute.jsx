// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "4") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
