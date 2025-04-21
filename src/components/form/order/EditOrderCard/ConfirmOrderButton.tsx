import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { confirmOrder } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Order, ORDER_STATUS } from "@/types/order";
import { CheckCircle, Loader2 } from "lucide-react";

export function ConfirmOrderButton({ order, onConfirm }: { order: Order; onConfirm?: () => void }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((state) => state.order);
  const currentStatus = order.orderStatusHistory[0].status;

  // Accept only PENDING orders to be confirmed
  if (currentStatus !== ORDER_STATUS.PENDING) {
    return null;
  }

  const handleConfirmOrder = async () => {
    try {
      await dispatch(confirmOrder({ id: order.id })).unwrap();
      toast({
        title: "Order confirmed",
        description: `Order #${order.code} has been confirmed successfully.`,
      });
      onConfirm?.();
    } catch (error) {
      toast({
        title: "Error confirming order",
        description: "There was an error confirming the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleConfirmOrder} disabled={loading.confirmOrder} className="w-full gap-2">
      {loading.confirmOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
      Confirm Order
    </Button>
  );
}
