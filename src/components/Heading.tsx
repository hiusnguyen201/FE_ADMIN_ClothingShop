import { ReactNode } from "react";
import { FlexBox } from "@/components/FlexBox";

export type HeadingProps = {
  title: string | ReactNode;
  description: string | ReactNode;
  actionRight?: ReactNode;
  className?: string;
};

export function Heading({ title, description, actionRight, className }: HeadingProps) {
  return (
    <FlexBox size="small" className={className}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-medium">{title}</h1>
        {actionRight}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </FlexBox>
  );
}
