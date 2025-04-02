import { GuestGuard } from "@/guards/GuestGuard";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { VerifyOTPPage } from "@/pages/auth/VerifyOTPPage";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/verify-otp", element: <VerifyOTPPage /> },
    ],
  },
];
