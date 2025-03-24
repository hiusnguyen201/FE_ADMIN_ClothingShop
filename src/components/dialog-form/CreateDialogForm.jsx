import { useFormik } from "formik";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { LoadingButton } from "../LoadingButton";

export function CreateDialogForm({
  open,
  loading,
  onClose,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full sm:max-w-[640px] max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <DialogHeader className="flex-row items-center justify-between px-10 pt-10 pb-6">
            <DialogPrimitive.DialogTitle className="text-xl font-medium">{title}</DialogPrimitive.DialogTitle>

            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <DialogDescription className="hidden" />

          <form onSubmit={formik.handleSubmit}>
            <div className="px-10 py-1 flex flex-col gap-6">
              {typeof children === "function" ? children(formik) : children}
            </div>
            <DialogFooter className="px-10 pb-10 pt-6 gap-2">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton disabled={loading} loading={loading} type="submit" className="min-w-[90px]">
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

CreateDialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
