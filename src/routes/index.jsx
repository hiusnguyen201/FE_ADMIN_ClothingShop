import { useRoutes } from "react-router-dom";
import HomeLayout from "@/layouts/client/home.layout";
import DashboardLayout from "@/layouts/server/dashboard.layout";
import RolesPage from "@/pages/roles/RolesPage";

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <h1>Home</h1>,
        },
        {
          path: "manageroles",
          element: <RolesPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <h1>Dashboard</h1>,
        },
      ],
    },
  ]);
}
