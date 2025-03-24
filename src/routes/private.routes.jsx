import AdminLayout from "@/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Import your admin pages
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { EditRolePage, RolesPage } from "@/pages/roles";
// import CustomersPage from "@/pages/customers/CustomersPage";
// import ProductsPage from "@/pages/products/ProductsPage";
// ...other imports

export const privateRoutes = [
  {
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/roles", element: <RolesPage /> },
      { path: "/roles/:slug", element: <EditRolePage /> },
      //   { path: "/categories/:id", element: <UpdateCategoryPage /> },
      //   { path: "/customers", element: <CustomersPage /> },
      //   { path: "/products", element: <ProductsPage /> },
      //   { path: "/categories", element: <CategoriesPage /> },
      //   { path: "/categories/create", element: <CreateCategoryPage /> },
      //   { path: "/vouchers", element: <VouchersPage /> },
      //   { path: "/orders", element: <OrdersPage /> },
      //   { path: "/reviews", element: <ReviewsPage /> },
      //   { path: "/users", element: <UsersPage /> },
      //   { path: "/permissions", element: <PermissionsPage /> },
      //   { path: "/settings", element: <SettingsPage /> },
    ],
  },
];
