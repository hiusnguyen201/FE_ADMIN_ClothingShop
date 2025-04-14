import { RouteObject } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AuthGuard } from "@/guards/AuthGuard";
import { DashboardPage } from "@/pages/dashboard";
import { RoleExistsGuard } from "@/guards/role/RoleExistsGuard";
import { UserExistsGuard } from "@/guards/user/UserExistsGuard";
import { DetailsUserPage, ListUserPage } from "@/pages/users";
import { DetailsRolePage, ListRolePage } from "@/pages/roles";
import { ListPermissionPage } from "@/pages/permissions";
import { NotFoundPage } from "@/pages/errors";
import { ListCategoryPage } from "@/pages/categories";
import { DetailsCategoryPage } from "@/pages/categories/DetailsCategoryPage";
import { CategoryExistsGuard } from "@/guards/category/CategoryExistsGuard";
import { ListProductPage, DetailsProductPage } from "@/pages/products";
import { ProductExistsGuard } from "@/guards/product/ProductExistsGuard";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/products", element: <ListProductPage /> },
      {
        path: "/products/:productId/settings",
        element: <ProductExistsGuard children={DetailsProductPage} />,
      },
      {
        path: "/products/:productId/variants",
        element: <ProductExistsGuard children={DetailsProductPage} />,
      },
      { path: "/categories", element: <ListCategoryPage /> },
      {
        path: "/categories/:categoryId/settings",
        element: <CategoryExistsGuard children={DetailsCategoryPage} />,
      },
      {
        path: "/categories/:categoryId/subcategories",
        element: <CategoryExistsGuard children={DetailsCategoryPage} />,
      },
      { path: "/users", element: <ListUserPage /> },
      {
        path: "/users/:userId/settings",
        element: <UserExistsGuard children={DetailsUserPage} />,
      },
      { path: "/roles", element: <ListRolePage /> },
      {
        path: "/roles/:roleId/settings",
        element: <RoleExistsGuard children={DetailsRolePage} />,
      },
      {
        path: "/roles/:roleId/permissions",
        element: <RoleExistsGuard children={DetailsRolePage} />,
      },
      {
        path: "/roles/:roleId/users",
        element: <RoleExistsGuard children={DetailsRolePage} />,
      },
      { path: "/permissions", element: <ListPermissionPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
