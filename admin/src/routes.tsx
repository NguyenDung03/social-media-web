import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/Login.tsx";
import DashboardPage from "./pages/home/dashboard/Dashboard.tsx";
import BrandPage from "./pages/home/brand/BrandPage.tsx";
import CategoryPage from "./pages/home/category/CategoryPage.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import PublicRoute from "./components/auth/PublicRoute.tsx";
import ProductPage from "./pages/home/product/ProductPage.tsx";

const routes: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
        children: [
          {
            path: "brand",
            element: <BrandPage />,
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "product",
            element: <ProductPage />,
          },
        ],
      },
    ],
  },
]);

export default routes;
