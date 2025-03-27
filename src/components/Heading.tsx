import { ReactNode } from "react";
import { FlexBox } from "@/components/FlexBox";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

export type HeadingProps = {
  title: string | ReactNode;
  description: string | ReactNode;
  actionRight?: ReactNode;
  className?: string;
  iconNextToTitle?: ReactNode;
};

export function Heading({ title, description, actionRight, className, iconNextToTitle }: HeadingProps) {
  return (
    <FlexBox size="small" className={className}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-medium truncate flex items-center gap-3">
          <TruncatedTextWithTooltip className="max-w-[600px]">{title}</TruncatedTextWithTooltip>
          {iconNextToTitle}
        </h1>
        {actionRight}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </FlexBox>
  );
}
