import { ReactNode } from "react";
import { usePermission } from "@/hooks/use-permission";
import { Navigate } from "react-router-dom";

export const PermissionGuard = ({ children, permission }: { children: ReactNode; permission: string }) => {
  const can = usePermission();

  if (!can(permission)) {
    return <Navigate to={"/forbidden"} />;
  }

  return children;
};
