import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import LoadingSpinner from "../../components/organisms/LoadingSpinner";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const location = useLocation();

  if (!storedToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;