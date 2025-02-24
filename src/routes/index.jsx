import { useRoutes } from "react-router-dom";
import AdminLayout from "@/layouts/admin/AdminLayout";
import DashboardPage from "@/pages/admin/dashboard/DashboardPage";
import CustomersPage from "@/pages/admin/customers/CustomersPage";
import ProductsPage from "@/pages/admin/products/ProductsPage";
import VouchersPage from "@/pages/admin/vouchers/VouchersPage";
import OrdersPage from "@/pages/admin/orders/OrdersPage";
import ReviewsPage from "@/pages/admin/reviews/ReviewsPage";
import UsersPage from "@/pages/admin/users/UsersPage";
import PermissionsPage from "@/pages/admin/permissions/PermissionsPage";
import SettingsPage from "@/pages/admin/settings/SettingsPage";
import {
  CreateCategoryPage,
  UpdateCategoryPage,
  CategoriesPage,
} from "@/pages/admin/categories";
import HomePage from "@/pages/client/home/HomePage";
import RolesPage from "@/pages/admin/roles/RolesPage";
import HomeLayout from "@/layouts/client/HomeLayout";
import AddRolePage from "@/pages/admin/roles/AddRolePage";
import CheckRole from "@/middlewares/CheckRole";

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
        {
          path: "categories/create",
          element: <CreateCategoryPage />,
        },
        {
          path: "categories/:id",
          element: <UpdateCategoryPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "vouchers",
          element: <VouchersPage />,
        },
        {
          path: "customers",
          element: <CustomersPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "reviews",
          element: <ReviewsPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "roles",
          element: <RolesPage />,
        },
        {
          path: "roles/add",
          element: <AddRolePage />,
        },
        {
          path: "roles/:name",
          element: <CheckRole />,
        },
        {
          path: "permissions",
          element: <PermissionsPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
  ]);
}
