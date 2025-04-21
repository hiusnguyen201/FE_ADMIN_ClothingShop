import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { cancelOrder } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Order, ORDER_STATUS } from "@/types/order";
import { Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { PAYMENT_STATUS } from "@/types/payment";

export function CancelOrderButton({
  order,
  onCancel,
  className,
}: {
  order: Order;
  onCancel?: () => void;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((state) => state.order);
  const currentStatus = order.orderStatusHistory[0].status;
  const [open, setOpen] = useState(false);

  if (![ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED, ORDER_STATUS.READY_TO_PICK].includes(currentStatus)) {
    return null;
  }

  if (order.payment.status === PAYMENT_STATUS.PAID) {
    return null;
  }

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder({ id: order.id })).unwrap();
      toast({
        title: "Order cancelled",
        description: `Order #${order.code} has been cancelled successfully.`,
      });
      setOpen(false);
      onCancel?.();
    } catch (error) {
      toast({
        title: "Error cancelling order",
        description: "There was an error cancelling the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={loading.cancelOrder} className={cn("w-full gap-2", className)}>
          {loading.cancelOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
          Cancel Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel order <b>#{order.code}</b>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading.cancelOrder}>No, keep order</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancelOrder}
            disabled={loading.cancelOrder}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading.cancelOrder ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <XCircle className="h-4 w-4 mr-2" />
            )}
            Yes, cancel order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
