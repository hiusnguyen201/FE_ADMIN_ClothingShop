import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ORDER_STATUS } from "@/types/order";

export function BadgeOrderStatus({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
  let color = "";

  switch (status) {
    case ORDER_STATUS.PENDING:
      variant = "outline";
      break;
    case ORDER_STATUS.CONFIRMED:
      variant = "default";
      break;
    case ORDER_STATUS.SHIPPING:
      variant = "default";
      break;
    case ORDER_STATUS.READY_TO_PICK:
      variant = "default";
      break;
    case ORDER_STATUS.COMPLETED:
      variant = "default";
      break;
    case ORDER_STATUS.CANCELLED:
      variant = "destructive";
      color = "text-white";
      break;
  }

  return (
    <Badge variant={variant} className={cn("capitalize", color)}>
      {status}
    </Badge>
  );
}
