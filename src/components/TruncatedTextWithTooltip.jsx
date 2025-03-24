import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Adjust to your tooltip library
import { cn } from "@/lib/utils";

export const TruncatedTextWithTooltip = ({ children }) => {
  const textRef = useRef(null);
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
          className={cn("truncate w-full text-start", isTruncated ? "cursor-pointer" : "cursor-default")}
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
