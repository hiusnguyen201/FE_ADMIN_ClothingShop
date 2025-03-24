import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export function LoadingButton({
  children,
  type = "submit",
  disabled,
  loading,
  ...props
}) {
  return (
    <Button
      className={cn(props?.className)}
      disabled={disabled}
      type={type}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </Button>
  );
}
