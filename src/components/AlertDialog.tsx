import {
  AlertDialog as ShadAlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cloneElement, ReactElement, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

interface AlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  children?: ReactNode;
  open?: boolean;
  trigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  loading: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function AlertDialog({
  title,
  description,
  onConfirm,
  confirmText,
  cancelText,
  trigger,
  open,
  onOpenChange,
  loading,
  variant,
}: AlertDialogProps) {
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";

  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const dialogOpen = isControlled ? open! : internalOpen;

  const setDialogOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange!(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const renderedChildren = isControlled ? trigger : cloneElement(trigger as ReactElement, { onClick: handleClick });

  return (
    <>
      {renderedChildren}

      {dialogOpen && (
        <ShadAlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogPortal>
            <AlertDialogOverlay
              onClick={() => {
                if (loading) return;
                setDialogOpen(false);
              }}
              className="bg-black/60"
            />
            <AlertDialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="capitalize text-sm" disabled={loading}>
                  {cancelText}
                </AlertDialogCancel>

                <Button
                  className="text-white min-w-20 text-sm capitalize"
                  variant={variant}
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    onConfirm();
                  }}
                >
                  {loading ? <LoaderCircle className="animate-spin" /> : confirmText}
                </Button>
              </AlertDialogFooter>
            </AlertDialogPrimitive.Content>
          </AlertDialogPortal>
        </ShadAlertDialog>
      )}
    </>
  );
}
