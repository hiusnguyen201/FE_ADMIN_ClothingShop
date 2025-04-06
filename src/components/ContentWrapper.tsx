import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type ContentWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "max-w-5xl justify-center mx-auto w-full flex flex-col gap-10",
        isMobile ? "p-6" : "p-10",
        className
      )}
    >
      {children}
    </div>
  );
}
