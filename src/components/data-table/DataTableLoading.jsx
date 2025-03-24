import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

export function DataTableLoading({ loading, children, className, initialized }) {
  return !initialized ? (
    <Spinner size="large" />
  ) : (
    <div className={cn("relative", loading && "opacity-50", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <Spinner size="large" />
        </div>
      )}
      {children}
    </div>
  );
}
