import AdminLayout from "@/layouts/AdminLayout";
import { AuthGuard } from "@/guards/AuthGuard";

// Import your admin pages
import { DashboardPage } from "@/pages/dashboard";
import { DetailsRolePage, ListRolePage } from "@/pages/roles";
import { RoleExistsGuard } from "@/guards/role/RoleExistsGuard";

export const privateRoutes = [
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
    ],
  },
];
