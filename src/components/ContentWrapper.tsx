import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div
      className={cn("lg:max-w-5xl max-w-full justify-center mx-auto w-full flex flex-col gap-10 py-10 px-6", className)}
    >
      {children}
    </div>
  );
}
