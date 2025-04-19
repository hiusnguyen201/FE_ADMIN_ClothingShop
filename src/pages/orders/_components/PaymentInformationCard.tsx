import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Order } from "@/types/order";
import { CheckCircle, Loader2, Truck } from "lucide-react";

export function PaymentInformationCard({ order }: { order: Order }) {
  const currentStatus = order.orderStatusHistory[order.orderStatusHistory.length - 1].status;

  const getActionButton = () => {
    if (currentStatus.toLowerCase() === "pending") {
      return (
        <Button onClick={handleConfirmOrder} disabled={false} className="w-full gap-2">
          {false ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
          Confirm Order
        </Button>
      );
    } else if (currentStatus.toLowerCase() === "confirmed") {
      return (
        <Button onClick={handleShipOrder} disabled={false} className="w-full gap-2">
          {false ? <Loader2 className="h-4 w-4 animate-spin" /> : <Truck className="h-4 w-4" />}
          Ship Order
        </Button>
      );
    }

    return null;
  };

  const handleConfirmOrder = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Order confirmed",
        description: `Order #${order.code} has been confirmed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error confirming order",
        description: "There was an error confirming the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShipOrder = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Order shipped",
        description: `Order #${order.code} has been marked as shipped.`,
      });
    } catch (error) {
      toast({
        title: "Error shipping order",
        description: "There was an error shipping the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Payment recorded",
        description: `Payment for order #${order.code} has been recorded.`,
      });
    } catch (error) {
      toast({
        title: "Error recording payment",
        description: "There was an error recording the payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="capitalize">{order.payment.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Status:</span>
            <Badge variant={order.payment.paidDate ? "default" : "outline"} className="capitalize">
              {order.payment.paidDate ? "paid" : "Unpaid"}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>{getActionButton()}</CardFooter>
    </Card>
  );
}
