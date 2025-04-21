import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ORDER_STATUS, OrderStatusHistory } from "@/types/order";
import { formatDateString } from "@/utils/date";
import { AlertCircle, CheckCheck, CheckCircle2, Clock, Package, Truck } from "lucide-react";

const statusSteps = [
  { key: ORDER_STATUS.PENDING, label: "Order Pending", icon: <Clock className="h-5 w-5" /> },
  { key: ORDER_STATUS.CONFIRMED, label: "Order Confirmed", icon: <CheckCircle2 className="h-5 w-5" /> },
  { key: ORDER_STATUS.PROCESSING, label: "Start Processing", icon: <CheckCircle2 className="h-5 w-5" /> },
  { key: ORDER_STATUS.READY_TO_PICK, label: "Waiting for Pickup", icon: <Package className="h-5 w-5" /> },
  { key: ORDER_STATUS.SHIPPING, label: "Shipping", icon: <Truck className="h-5 w-5" /> },
  { key: ORDER_STATUS.COMPLETED, label: "Completed", icon: <CheckCheck className="h-5 w-5" /> },
];

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case ORDER_STATUS.CONFIRMED:
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case ORDER_STATUS.READY_TO_PICK:
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
    case ORDER_STATUS.SHIPPING:
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case ORDER_STATUS.COMPLETED:
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case ORDER_STATUS.CANCELLED:
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};
export function OrderStatusHistoryCard({ orderStatusHistory }: { orderStatusHistory: OrderStatusHistory[] }) {
  const currentStatus = orderStatusHistory[0];
  const currentStepIndex = statusSteps.findIndex((step) => step.key === currentStatus.status);
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium capitalize">{currentStatus.status}</h3>
              <p className="text-sm text-muted-foreground">Updated {formatDateString(currentStatus.updatedAt)}</p>
            </div>
            <Badge className={`capitalize ${getStatusBadgeStyle(currentStatus.status)}`}>{currentStatus.status}</Badge>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Order Timeline</h3>
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex && currentStatus.status !== ORDER_STATUS.CANCELLED;
              const isCurrent = index === currentStepIndex;
              const isCancelled = currentStatus.status === ORDER_STATUS.CANCELLED;

              return (
                <div key={step.key} className="flex items-start mb-4 last:mb-0">
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                        isCancelled && index > currentStepIndex
                          ? "bg-muted text-muted-foreground opacity-30"
                          : isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute top-8 left-4 w-0.5 h-full -ml-px ${
                          isCancelled
                            ? "bg-red-300"
                            : index < currentStepIndex
                            ? "bg-primary"
                            : "bg-muted-foreground/20"
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-4 w-full">
                    <div className="flex justify-between">
                      <h4
                        className={`font-medium ${isCurrent ? "text-primary" : ""} ${
                          isCancelled && index > currentStepIndex ? "text-muted-foreground/50" : ""
                        }`}
                      >
                        {step.label}
                      </h4>
                      {isCompleted && index < orderStatusHistory.length && (
                        <span className="text-xs text-muted-foreground">
                          {formatDateString(orderStatusHistory[index].updatedAt)}
                        </span>
                      )}
                    </div>
                    {isCurrent && currentStatus.status === ORDER_STATUS.CANCELLED && (
                      <div className="mt-2 text-sm space-y-1 bg-red-50 p-2 rounded border border-red-200">
                        <p className="flex items-center gap-2 text-red-700">
                          <AlertCircle className="h-4 w-4" />
                          <span>Order has been cancelled</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
