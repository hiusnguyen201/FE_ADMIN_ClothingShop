import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS } from "@/types/payment";

export function BadgePaymentStatus({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
  let color = "";

  switch (status) {
    case PAYMENT_STATUS.PENDING:
      variant = "outline";
      break;
    case PAYMENT_STATUS.PAID:
      variant = "default";
      break;
    case PAYMENT_STATUS.CANCELLED:
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
