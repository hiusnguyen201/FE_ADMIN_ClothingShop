import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { getHistory, HistoryItem } from "@/utils/history";

export const GuestGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    const history: HistoryItem[] = getHistory();
    return navigate(history[history.length - 1].url || "/");
  }

  return children;
};
