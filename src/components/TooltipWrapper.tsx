import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

type TooltipWrapperProps = {
  content: string;
  children: ReactNode;
};

export function TooltipWrapper({ content, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer" asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          <p className="capitalize">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
