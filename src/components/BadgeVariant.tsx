import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariantProps = {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<string, string> = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-400",
  success: "bg-green-500 text-white hover:bg-green-600",
};

export const BadgeVariant: React.FC<BadgeVariantProps> = ({ variant = "default", children, className }) => {
  const variantClass = variantClasses[variant] || variantClasses.default;
  return (
    <Badge className={cn("capitalize text-sx text-white rounded py-[1px] px-[6px]", variantClass, className)}>
      {children}
    </Badge>
  );
};
