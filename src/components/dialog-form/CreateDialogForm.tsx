import { ReactNode, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Schema } from "yup";
import { FormikErrors, FormikHelpers, FormikValues, useFormik } from "formik";
import { X } from "lucide-react";
import { Dialog, DialogHeader, DialogFooter, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/LoadingButton";
import { cn } from "@/lib/utils";

export type CreateDialogFormProps<T extends FormikValues> = {
  open?: boolean;
  loading: boolean;
  onOpenChange?: (value: boolean) => void;
  title: string;
  initialValues: T;
  validationSchema: Schema<T>;
  trigger?: ReactNode;
  extendSchema?: (values: T) => void | object | Promise<FormikErrors<T>>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  children: (formik: ReturnType<typeof useFormik<T>>) => ReactNode;
  disableClose?: boolean;
  titleSubmit?: string;
  onClose?: () => void;
  className?: string;
};

export function CreateDialogForm<T extends FormikValues>({
  open,
  loading,
  onOpenChange,
  title,
  initialValues,
  validationSchema,
  trigger,
  extendSchema,
  onSubmit,
  children,
  titleSubmit = "Create",
  disableClose = false,
  onClose,
  className,
}: CreateDialogFormProps<T>) {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    validate: async (values: T) => {
      const isValid = await validationSchema.isValid(values);

      if (!isValid) return;

      return await extendSchema?.(values);
    },
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";

  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const dialogOpen = isControlled ? open : internalOpen;

  const setDialogOpen = (value: boolean) => {
    if (loading) return;

    if (isControlled) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }

    formik.resetForm();
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(value: boolean) => {
        if (disableClose) return;
        if (value === false) {
          onClose?.();
        }
        setDialogOpen(value);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          aria-hidden={dialogOpen ? "false" : "true"}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full sm:max-w-2xl max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className
          )}
        >
          <DialogHeader className="flex-row space-y-0 items-center justify-between px-10 pt-10 pb-6">
            <DialogPrimitive.DialogTitle className="text-xl font-medium">{title}</DialogPrimitive.DialogTitle>

            <Button
              disabled={loading}
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <DialogDescription className="hidden" />

          <form>
            <div className="px-10 py-1 flex flex-col gap-6">{children(formik)}</div>
            <DialogFooter className="px-10 pb-10 pt-6 gap-2">
              <Button disabled={loading} variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <LoadingButton
                onClick={(e) => {
                  e.preventDefault();
                  if (formik.isValid) {
                    formik.handleSubmit();
                  }
                }}
                disabled={loading}
                loading={loading}
                type="submit"
                className="min-w-[90px]"
              >
                {titleSubmit}
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
