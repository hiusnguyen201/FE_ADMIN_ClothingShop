import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { processingOrder } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Order, ORDER_STATUS } from "@/types/order";
import { CheckCircle, Loader2 } from "lucide-react";

export function StartProcessingOrderButton({ order, onProcess }: { order: Order; onProcess?: () => void }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((state) => state.order);
  const currentStatus = order.orderStatusHistory[0].status;

  if (currentStatus !== ORDER_STATUS.CONFIRMED) {
    return null;
  }

  const handleProcessOrder = async () => {
    try {
      await dispatch(processingOrder({ id: order.id })).unwrap();
      toast({
        title: "Order processing",
        description: `Order #${order.code} is now being processed.`,
      });
      onProcess?.();
    } catch (error) {
      toast({
        title: "Error processing order",
        description: "There was an error processing the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleProcessOrder} disabled={loading.processingOrder} className="w-full gap-2">
      {loading.processingOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
      Start processing
    </Button>
  );
}
