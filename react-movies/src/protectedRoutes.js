import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../src/contexts/authContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
