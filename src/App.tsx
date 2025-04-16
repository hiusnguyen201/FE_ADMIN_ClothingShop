import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setHistory } from "@/utils/history";

function App() {
  const { isInitialized } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setHistory(location.pathname);
  }, [location.pathname]);

  return (
    <div className="max-h-screen overflow-auto">
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
