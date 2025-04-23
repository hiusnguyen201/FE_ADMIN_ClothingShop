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
import { DetailsCustomerPage, ListCustomerPage } from "@/pages/customers";
import { CustomerExistsGuard } from "@/guards/customer/CustomerExistsGuard";
import { DetailsOrderPage, ListOrderPage } from "@/pages/orders";
import { CreateOrderPage } from "@/pages/orders/CreateOrderPage";
import { CreateProductPage } from "@/pages/products/CreateProductPage";
import { OrderExistsGuard } from "@/guards/order/OrderExistsGuard";
import { ProfilePage } from "@/pages/account/ProfilePage";
import { PermissionGuard } from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";
import { ForbiddenPage } from "@/pages/errors/ForbiddenPage";

export const privateRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <DashboardPage /> },
      {
        path: "/products",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_PRODUCTS}>
            <ListProductPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/products/new",
        element: (
          <PermissionGuard permission={PERMISSIONS.CREATE_PRODUCT}>
            <CreateProductPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/products/:productId/settings",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_PRODUCT}>
            <ProductExistsGuard children={DetailsProductPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/products/:productId/variants",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_PRODUCT}>
            <ProductExistsGuard children={DetailsProductPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/categories",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_CATEGORIES}>
            <ListCategoryPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/categories/:categoryId/settings",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_CATEGORY}>
            <CategoryExistsGuard children={DetailsCategoryPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/categories/:categoryId/subcategories",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_CATEGORY}>
            <CategoryExistsGuard children={DetailsCategoryPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/customers",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_CUSTOMERS}>
            <ListCustomerPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/customers/:customerId/settings",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_CUSTOMER}>
            <CustomerExistsGuard children={DetailsCustomerPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/users",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_USERS}>
            <ListUserPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/users/:userId/settings",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_USERS}>
            <UserExistsGuard children={DetailsUserPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/orders",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_ORDERS}>
            <ListOrderPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/orders/create",
        element: (
          <PermissionGuard permission={PERMISSIONS.CREATE_ORDER}>
            <CreateOrderPage />
          </PermissionGuard>
        ),
      },
      {
        path: "/orders/:orderCode",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_ORDER}>
            <OrderExistsGuard children={DetailsOrderPage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/roles",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_ROLES}>
            <ListRolePage />
          </PermissionGuard>
        ),
      },
      {
        path: "/roles/:roleId/settings",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_DETAILS_ROLE}>
            <RoleExistsGuard children={DetailsRolePage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/roles/:roleId/permissions",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_ASSIGNED_ROLE_PERMISSIONS}>
            <RoleExistsGuard children={DetailsRolePage} />
          </PermissionGuard>
        ),
      },
      {
        path: "/permissions",
        element: (
          <PermissionGuard permission={PERMISSIONS.READ_PERMISSIONS}>
            <ListPermissionPage />
          </PermissionGuard>
        ),
      },
      { path: "/profile/general", element: <ProfilePage /> },
    ],
  },
  { path: "/forbidden", element: <ForbiddenPage /> },
  { path: "*", element: <NotFoundPage /> },
];
