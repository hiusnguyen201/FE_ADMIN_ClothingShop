import PropTypes from 'prop-types';
import { Arrow } from '@radix-ui/react-tooltip';
import { forwardRef, useState } from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const TooltipButton = forwardRef(
  (
    { children, content, shape = 'circle', variant = 'secondary', side = 'bottom', className, size = 8, ...props },
    ref
  ) => {
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
            ref={ref}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            className={cn(
              '!mt-0 hover:bg-gray-200 p-2 focus-visible:ring-0 shadow-none min-w-auto capitalize',
              shape === 'circle' && 'rounded-full',
              shape === 'square' && 'rounded',
              size && `h-${size} w-${size}`,
              className
            )}
            variant={variant}
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
);

TooltipButton.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  side: PropTypes.string,
  className: PropTypes.string,
};
