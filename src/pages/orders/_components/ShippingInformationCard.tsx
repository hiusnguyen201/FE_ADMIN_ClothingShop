import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";
import { MapPin, User } from "lucide-react";

export function ShippingInformationCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Recipient and delivery address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">Recipient</div>
            <div className="text-sm">{order.customerName}</div>
            <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
            <div className="text-sm">{order.customerPhone}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div className="font-medium">Delivery Address</div>
            <div className="text-sm">{order.address}</div>
            <div className="text-sm">
              {order.wardName}, {order.districtName}
            </div>
            <div className="text-sm">{order.provinceName}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
