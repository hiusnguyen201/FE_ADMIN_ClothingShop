import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { getHistory } from "@/utils/history";
export const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const history = getHistory();

  if (isAuthenticated) {
    const previousHistory = history[history.length - 1];
    return <Navigate to={previousHistory ? previousHistory.url : "/"} />;
  }

  return children;
};
