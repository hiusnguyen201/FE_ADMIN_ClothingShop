import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BoxStatusMessageProps {
  status: "success" | "error" | "warning";
  title: string;
  description?: string;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-900",
    textColor: "text-green-800 dark:text-green-300",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    text: "Deactivated",
    description: "This product has been deactivated and is not available for purchase.",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    textColor: "text-red-800 dark:text-red-300",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertCircle,
    text: "Draft",
    description: "This product is in draft mode and not visible to customers.",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-900",
    textColor: "text-amber-800 dark:text-amber-300",
    iconColor: "text-amber-500",
  },
};

export function BoxStatusMessage({ status, className, title, description }: BoxStatusMessageProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-md border p-4",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 mt-0.5", config.iconColor)} />
      <div>
        <h4 className={cn("font-medium", config.textColor)}>{title}</h4>
        {description && <p className={cn("text-sm mt-1", config.textColor)}>{description}</p>}
      </div>
    </div>
  );
}
