import { LegacyRef, ReactNode, useEffect, useRef, useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Adjust to your tooltip library
import { cn } from "@/lib/utils";

export type TruncatedTextWithTooltipProps = {
  children?: string | ReactNode;
  className?: string;
};

export const TruncatedTextWithTooltip = ({ children, className }: TruncatedTextWithTooltipProps) => {
  const textRef: LegacyRef<HTMLButtonElement> = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkTruncation(); // Check on initial render
    window.addEventListener("resize", checkTruncation); // Recheck on resize

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className={cn("truncate w-full text-start", isTruncated ? "cursor-pointer" : "cursor-default", className)}
          ref={textRef}
        >
          {children}
        </TooltipTrigger>
        {isTruncated && (
          <TooltipContent className="p-2">
            <p>{children}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
