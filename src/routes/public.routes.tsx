import { GuestGuard } from "@/guards/GuestGuard";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RouteObject } from "react-router-dom";
// import RegisterPage from "@/pages/auth/RegisterPage";

export const publicRoutes: RouteObject[] = [
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [{ path: "/login", element: <LoginPage /> }],
  },
];
