import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
export const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
