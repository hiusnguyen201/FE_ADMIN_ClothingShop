import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductBadge({ title, className }) {
  const isMobile = useIsMobile();
  return (
    <Badge
      style={{
        fontSize: isMobile ? 10 : 12,
      }}
      className={cn(
        "bg-[#273bcd] hover:bg-[#273bcd] px-1 py-0",
        className
      )}
    >
      {title}
    </Badge>
  );
}
