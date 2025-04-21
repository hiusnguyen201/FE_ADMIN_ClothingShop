import { Image } from "@/components/Image";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as TableContainer } from "@/components/ui/table";
import { Order } from "@/types/order";
import { formatCurrencyVND } from "@/utils/string";

export function OrderItemsCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <CardDescription>{order.quantity} items in this order</CardDescription>
      </CardHeader>
      <CardContent>
        <TableContainer>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderDetails.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="min-w-[300px]">
                  <div className="flex items-center gap-3">
                    <Image alt={item.product.name} src={item.product.thumbnail} />
                    <div className="font-medium">
                      <TruncatedTextWithTooltip lineClamp={2}>{item.product.name}</TruncatedTextWithTooltip>
                      <div className="text-xs text-muted-foreground">SKU: {item.variant.sku}</div>
                      {item.variant.variantValues.map((variantValue) => (
                        <div key={variantValue.id} className="text-xs text-muted-foreground">
                          <span className="text-muted-foreground">{variantValue.option.name}:</span>{" "}
                          <span className="font-medium">{variantValue.optionValue.valueName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium min-w-[150px]">
                  <div className="flex-col flex">
                    {formatCurrencyVND(item.totalPrice)}
                    <span className="text-muted-foreground text-xs">
                      {formatCurrencyVND(item.unitPrice)} x {item.quantity}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-end space-y-2">
        <div className="flex justify-between w-full md:w-1/2">
          <span>Subtotal:</span>
          <span>{formatCurrencyVND(order.subTotal)}</span>
        </div>
        <div className="flex justify-between w-full md:w-1/2">
          <span>Shipping:</span>
          <span>{order.shippingFee === 0 ? "Free" : formatCurrencyVND(order.shippingFee)}</span>
        </div>
        <Separator className="my-2 w-full md:w-1/2" />
        <div className="flex justify-between w-full md:w-1/2 font-bold">
          <span>Total:</span>
          <span>{formatCurrencyVND(order.total)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
