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

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/users", element: <ListUserPage /> },
      {
        path: "/users/:userId/settings",
        element: <UserExistsGuard children={DetailsUserPage} />,
      },
      {
        path: "/users/:userId/permissions",
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
