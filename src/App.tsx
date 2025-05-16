import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useKeepAlive } from "@/hooks/use-keep-alive";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const { isInitialized } = useAuth();
  const location = useLocation();
  useKeepAlive();

  if (location.pathname === "/") {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div>
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
