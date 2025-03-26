import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export type TLoadingButton = {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export function LoadingButton({ children, type = "submit", disabled, loading, className }: TLoadingButton) {
  return (
    <Button className={cn(className)} disabled={disabled} type={type}>
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </Button>
  );
}
