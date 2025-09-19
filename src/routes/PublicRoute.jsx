// src/routes/PublicRoute.js


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PublicRoute = ({ children }) => {
// const { user } = useAuth();

//   if (user) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PublicRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // ✅ Redirect to intended page if available, otherwise home
    const redirectTo = location.state?.from?.pathname || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;

