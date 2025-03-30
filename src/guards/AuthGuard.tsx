import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { getHistory, setHistory } from "@/utils/history";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const history = getHistory();
    if (history[history.length - 1]?.url !== location.pathname) {
      setHistory(location.pathname);
    }
  }, [location.pathname]);

  return children;
};
