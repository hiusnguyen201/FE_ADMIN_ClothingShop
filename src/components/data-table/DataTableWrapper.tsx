import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TDataTableWrapper = {
  children: ReactNode;
  className?: string;
};

export function DataTableWrapper({ children, className }: TDataTableWrapper) {
  return (
    <div className={cn("sm:p-10 max-w-5xl p-6 justify-center mx-auto w-full flex flex-col gap-10", className)}>
      {children}
    </div>
  );
}
