import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoute: React.FC = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
export default PublicRoute;
