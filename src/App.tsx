import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";

function App() {
  const { isInitialized } = useAuth();

  return (
    <div>
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
