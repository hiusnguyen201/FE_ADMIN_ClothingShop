import { ReactNode } from "react";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

export type DataTableLoadingProps = {
  loading: boolean;
  children?: ReactNode;
  className?: string;
};

export function DataTableLoading({ loading, children, className }: DataTableLoadingProps) {
  return loading ? (
    <Spinner size="large" />
  ) : (
    <div className={cn("relative", loading && "opacity-50", className)}>{children}</div>
  );
}
