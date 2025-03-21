import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MainButton = ({ icon, className, children, variant = 'default', ...props }) => {
  return (
    <Button
      className={cn(
        'text-base rounded gap-0 h-10',
        variant === 'default' && 'bg-[var(--bgcl-primary)] hover:bg-[var(--bgcl-hover-primary)]',
        className
      )}
      style={{
        padding: '9px 16px',
      }}
      variant={variant}
      {...props}
    >
      {icon && (
        <span
          className="text-white"
          style={{
            marginLeft: '-4px',
            marginRight: '8px',
          }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Button>
  );
};
