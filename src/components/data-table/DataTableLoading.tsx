import { ReactNode } from "react";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

export type DataTableLoadingProps = {
  children?: ReactNode;
  className?: string;
  initialized?: boolean;
};

export function DataTableLoading({ initialized = false, children, className }: DataTableLoadingProps) {
  return <div className={cn("relative", className)}>{initialized ? children : <Spinner size="large" />}</div>;
}
