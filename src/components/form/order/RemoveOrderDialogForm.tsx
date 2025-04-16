import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Order } from "@/types/order";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveOrderResponse, OrderState } from "@/redux/order/order.type";
import { removeOrder } from "@/redux/order/order.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveOrderDialogFormProps = {
  order: Order;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function RemoveOrderDialogForm({ order, children, open, onOpenChange }: RemoveOrderDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<OrderState>((selector) => selector.order);

  const handleRemove = async () => {
    try {
      const response: RemoveOrderResponse = await dispatch(removeOrder({ id: order.id })).unwrap();
      toast({ title: response.message });
      navigate("/orders");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      variant="destructive"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Remove Order"
      description={`Are you sure you want to delete order "${order.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeOrder}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
