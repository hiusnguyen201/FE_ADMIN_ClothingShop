import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusHistory } from "@/types/order";
import { formatDateString } from "@/utils/date";

export function OrderStatusHistoryCard({ orderStatusHistory }: { orderStatusHistory: OrderStatusHistory[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Order Status</CardTitle>
        <Badge className="capitalize">{orderStatusHistory[orderStatusHistory.length - 1].status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm font-medium">Status History</div>
          <div className="space-y-3">
            {orderStatusHistory.map((history, index) => (
              <div key={history.id} className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium capitalize">{history.status}</div>
                  <div className="text-sm text-muted-foreground">{formatDateString(history.createdAt, "long")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
