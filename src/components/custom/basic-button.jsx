import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BasicButton({ icon, text, className, ...props }) {
  return (
    <Button
      className={cn(
        "focus-visible:ring-0 focus-visible:ring-offset-0 bg-[transparent] hover:bg-[transparent]",
        className
      )}
      {...props}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Button>
  );
}
