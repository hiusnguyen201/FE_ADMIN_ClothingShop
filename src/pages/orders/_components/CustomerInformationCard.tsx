import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";
import { formatDateString } from "@/utils/date";
import { Calendar, Phone, User } from "lucide-react";

export function CustomerInformationCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">Phone</div>
            <div className="text-sm">{order.customerPhone}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">Order Date</div>
            <div className="text-sm">{formatDateString(order.orderDate, "date")}</div>
            <div className="text-sm text-muted-foreground">{formatDateString(order.orderDate, "time")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
