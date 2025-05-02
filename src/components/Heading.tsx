import { createElement, ReactNode } from "react";
import { FlexBox } from "@/components/FlexBox";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { cn } from "@/lib/utils";

export type HeadingProps = {
  title?: string | ReactNode;
  description?: string | ReactNode;
  actionRight?: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const headingSize = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
  5: "text-base",
  6: "text-sm",
};

export function Heading({ level = 1, title, description, actionRight, className }: HeadingProps) {
  const Component = typeof description === "string" ? "p" : "div";

  const HeadingLevel = `h${level}`;

  return (
    <FlexBox size="small" className={className}>
      <div className="flex justify-between items-center w-full">
        {title &&
          createElement(HeadingLevel, {
            className: cn("font-medium truncate flex items-center gap-3", headingSize[level]),
            children: <TruncatedTextWithTooltip className="md:max-w-[600px]">{title}</TruncatedTextWithTooltip>,
          })}

        {!title && description && (
          <Component className="flex items-centers gap-1 text-gray-600 text-sm">{description}</Component>
        )}

        {actionRight}
      </div>
      {title && description && (
        <Component className="flex items-centers gap-1 text-gray-600 text-sm">{description}</Component>
      )}
    </FlexBox>
  );
}
