import { cn } from "@/lib/utils";
import { ComponentProps, ElementType, ReactNode } from "react";

type FlexBoxProps<T extends ElementType> = {
  children?: ReactNode | ReactNode[];
  size?: "small" | "medium" | "large";
  direction?: "column" | "row";
  className?: string;
  component?: T;
} & Omit<ComponentProps<T>, "children" | "className">;

const sizeValues = {
  small: 4,
  medium: 6,
  large: 10,
};

const directionValues = {
  column: "col",
  row: "row",
};

export function FlexBox<T extends ElementType = "div">({
  children,
  size = "medium",
  direction = "column",
  className,
  component,
  ...props
}: FlexBoxProps<T>) {
  const Component = component || "div";
  return (
    <Component
      className={cn(
        "flex items-start w-full",
        `gap-${sizeValues[size]}`,
        `flex-${directionValues[direction]}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
