import AdminLayout from "@/layouts/AdminLayout";
import { AuthGuard } from "@/guards/AuthGuard";

// Import your admin pages
import { DashboardPage } from "@/pages/dashboard";
import { DetailsRolePage, ListRolePage } from "@/pages/roles";
import { RoleExistsGuard } from "@/guards/role/RoleExistsGuard";
import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "@/pages/errors";
import { ListPermissionPage } from "@/pages/permissions";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
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
