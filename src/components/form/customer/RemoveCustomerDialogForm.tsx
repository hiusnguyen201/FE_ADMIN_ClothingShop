import { AlertDialog } from "@/components/AlertDialog";
import { Customer } from "@/types/customer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveCustomerResponse, CustomerState } from "@/redux/customer/customer.type";
import { removeCustomer } from "@/redux/customer/customer.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

type RemoveCustomerDialogFormProps = {
  customer: Customer;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children?: ReactNode;
};

export function RemoveCustomerDialogForm({ customer, open, onOpenChange, children }: RemoveCustomerDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<CustomerState>((selector) => selector.customer);

  const handleRemove = async () => {
    try {
      const response: RemoveCustomerResponse = await dispatch(removeCustomer({ id: customer.id })).unwrap();
      toast({ title: response.message });
      navigate("/customers");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Remove Customer"
      description={`Are you sure you want to delete customer "${customer.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeCustomer}
      cancelText="Cancel"
      confirmText="Confirm"
      trigger={children}
    />
  );
}
