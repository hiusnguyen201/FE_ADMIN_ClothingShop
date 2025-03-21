import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Arrow } from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { Button } from '../ui/button';

export function TooltipWrapper({ children, content, side = 'bottom', className, ...props }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <Button
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          onClick={(e) => {
            e.preventDefault();
          }}
          className="rounded-full !mt-0 h-8 p-2 hover:bg-gray-200"
          variant="secondary"
          {...props}
        >
          <TooltipTrigger asChild>{children}</TooltipTrigger>
        </Button>
        <TooltipContent
          side={side}
          sideOffset={9}
          style={{
            fontSize: '0.8125rem',
            borderRadius: '4px',
            padding: '8px 12px',
            fontWeight: 500,
            overflow: 'visible',
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          {content}
          <Arrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
