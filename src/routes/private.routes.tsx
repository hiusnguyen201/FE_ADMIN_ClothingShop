import AdminLayout from "@/layouts/AdminLayout";
import { AuthGuard } from "@/guards/AuthGuard";

// Import your admin pages
import { DashboardPage } from "@/pages/dashboard";
import { RolesPage } from "@/pages/roles";
// import CustomersPage from "@/pages/customers/CustomersPage";
// import ProductsPage from "@/pages/products/ProductsPage";

export const privateRoutes = [
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/roles", element: <RolesPage /> },
      // { path: "/roles/:slug", element: <EditRolePage /> },
    ],
  },
];
