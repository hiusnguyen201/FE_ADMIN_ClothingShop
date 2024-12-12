import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ColorBadge({
  active = false,
  color = "#000",
  disabled = false,
}) {
  return (
    <Badge
      variant="outline"
      style={{
        backgroundColor: color,
      }}
      className={cn(
        "w-[32px] h-[18px] cursor-pointer",
        active
          ? "outline outline-1 outline-gray-500 outline-offset-2"
          : "",
        disabled ? "opacity-60 cursor-auto outline-0" : ""
      )}
    ></Badge>
  );
}
