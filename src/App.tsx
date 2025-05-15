import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useKeepAlive } from "@/hooks/use-keep-alive";

function App() {
  const { isInitialized } = useAuth();
  useKeepAlive();

  return (
    <div>
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
