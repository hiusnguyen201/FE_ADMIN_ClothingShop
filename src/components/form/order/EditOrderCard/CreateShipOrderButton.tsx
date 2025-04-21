import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createShipOrder } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Order, ORDER_STATUS } from "@/types/order";
import { Loader2, Truck } from "lucide-react";

export function CreateShipOrderButton({ order, onConfirm }: { order: Order; onConfirm?: () => void }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((state) => state.order);
  const currentStatus = order.orderStatusHistory[0].status;

  // Accept only CONFIRMED orders to be confirmed
  if (currentStatus !== ORDER_STATUS.PROCESSING) {
    return null;
  }

  const handleCreateShipOrder = async () => {
    try {
      await dispatch(createShipOrder({ id: order.id })).unwrap();
      toast({
        title: "Order shipped",
        description: `Order #${order.code} has been marked as shipped.`,
      });
      onConfirm?.();
    } catch (error) {
      toast({
        title: "Error shipping order",
        description: "There was an error shipping the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleCreateShipOrder} disabled={loading.createShipOrder} className="w-full gap-2">
      {loading.createShipOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : <Truck className="h-4 w-4" />}
      Ship Order
    </Button>
  );
}
