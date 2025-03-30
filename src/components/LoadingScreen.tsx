import { LoaderCircle } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="flex flex-col items-center space-y-4">
        <LoaderCircle className="w-12 h-12 animate-spin" />
      </div>
    </div>
  );
}
