import { useRoutes } from "react-router-dom";
import HomeLayout from "@/layouts/client/home.layout";
import DashboardLayout from "@/layouts/server/dashboard.layout";
import RolesPage from "@/pages/roles/RolesPage";
import CreateRolePage from "@/pages/roles/CreateRolePage";
import EditRolePage from "@/pages/roles/EditRolePage";

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
