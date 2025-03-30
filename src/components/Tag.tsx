import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn("rounded bg-gray-100 text-xs py-[1px] px-[6px] text-gray-700", className)}>{children}</span>
  );
}
