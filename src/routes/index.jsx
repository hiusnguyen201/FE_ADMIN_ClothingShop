import { useRoutes } from "react-router-dom";
import HomeLayout from "@/layouts/client/home.layout";
import DashboardLayout from "@/layouts/server/dashboard.layout";
import RolesPage from "@/pages/roles/RolesPage";
import CreateRolePage from "@/pages/roles/CreateRolePage";
import EditRolePage from "@/pages/roles/EditRolePage";
import AdminLayout from "@/layouts/admin/AdminLayout";
import HomeLayout from "@/layouts/client/HomeLayout";
import DashboardPage from "@/pages/admin/dashboard/DashboardPage";
import CustomersPage from "@/pages/admin/customers/CustomersPage";
import ProductsPage from "@/pages/admin/products/ProductsPage";
import VouchersPage from "@/pages/admin/vouchers/VouchersPage";
import OrdersPage from "@/pages/admin/orders/OrdersPage";
import ReviewsPage from "@/pages/admin/reviews/ReviewsPage";
import UsersPage from "@/pages/admin/users/UsersPage";
import RolesPage from "@/pages/admin/roles/RolesPage";
import PermissionsPage from "@/pages/admin/permissions/PermissionsPage";
import SettingsPage from "@/pages/admin/settings/SettingsPage";
import {
  CreateCategoryPage,
  UpdateCategoryPage,
  CategoriesPage,
} from "@/pages/admin/categories";
import HomePage from "@/pages/client/home/HomePage";

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
        {
          path: "manageroles",
          element: <RolesPage />,
        },
        {
          path: "/manageroles/create",
          element: <CreateRolePage/>,
        },
        {
          path: "/managerole/edit/:id",
          element: <EditRolePage/>,
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
