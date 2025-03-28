import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { forwardRef, ReactNode } from "react";

type TooltipWrapperProps = {
  content: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const TooltipWrapper = forwardRef<HTMLDivElement, TooltipWrapperProps>(
  ({ content, children, open, onOpenChange }, ref) => {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip open={false} onOpenChange={onOpenChange}>
          <TooltipTrigger className="cursor-pointer" asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black text-white" ref={ref}>
            <p className="capitalize">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
