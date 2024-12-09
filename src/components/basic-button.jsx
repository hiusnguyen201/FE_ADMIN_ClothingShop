import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BasicButton({ children, className, ...props }) {
  return (
    <Button
      className={cn(
        "focus-visible:ring-0 focus-visible:ring-offset-0 bg-[transparent] hover:bg-[transparent]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
