import { ReactNode, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export type LoadingButtonProps = {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
};

export function LoadingButton({
  children,
  type = "submit",
  disabled,
  loading,
  className,
  onClick,
  variant = "default",
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("rounded text-sm font-medium min-w-16 flex items-center gap-1", className)}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </Button>
  );
}
