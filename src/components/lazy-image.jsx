import { cn } from "@/lib/utils";

export function LazyImage({ ...props }) {
  return (
    <img
      {...props}
      className={cn("lazyload select-none", props.className)}
      data-src={props.src}
    />
  );
}
