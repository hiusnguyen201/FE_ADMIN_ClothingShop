import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div className={cn("sm:p-10 max-w-5xl p-6 justify-center mx-auto w-full flex flex-col gap-10", className)}>
      {children}
    </div>
  );
}
