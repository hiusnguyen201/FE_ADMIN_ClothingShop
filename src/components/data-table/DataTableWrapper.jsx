import { cn } from "@/lib/utils";

export function DataTableWrapper({ children, className }) {
  return (
    <div className={cn("sm:p-10 max-w-5xl p-6 justify-center mx-auto w-full flex flex-col gap-10", className)}>
      {children}
    </div>
  );
}
