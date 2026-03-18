import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép truy cập vào các route con
  return <Outlet />;
};

export default ProtectedRoute;
