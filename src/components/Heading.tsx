import { ReactNode } from "react";
import { FlexBox } from "@/components/FlexBox";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

export type HeadingProps = {
  title?: string | ReactNode;
  description: string | ReactNode;
  actionRight?: ReactNode;
  className?: string;
};

export function Heading({ title, description, actionRight, className }: HeadingProps) {
  const Component = typeof description === "string" ? "p" : "div";

  return (
    <FlexBox size="small" className={className}>
      <div className="flex justify-between items-center w-full">
        {title && (
          <h1 className="text-3xl font-medium truncate flex items-center gap-3">
            <TruncatedTextWithTooltip className="max-w-[600px]">{title}</TruncatedTextWithTooltip>
          </h1>
        )}

        {actionRight}
      </div>
      {description && <Component className="flex items-centers gap-1 text-gray-600 text-sm">{description}</Component>}
    </FlexBox>
  );
}
