import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Nếu người dùng đã đăng nhập thì không cho vào trang login nữa,
  // thay vào đó chuyển hướng về trang chủ
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập, cho phép truy cập vào trang login công khai
  return <Outlet />;
};

export default PublicRoute;
