import { BadgePaymentStatus } from "@/components/BadgePaymentStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { PaymentInformationDialog } from "@/components/form/order/EditOrderCard/PaymentInformationDialog";
import { ONLINE_PAYMENT_METHOD, PAYMENT_STATUS } from "@/types/payment";
import { ConfirmOrderButton } from "@/components/form/order/EditOrderCard/ConfirmOrderButton";
import { CreateShipOrderButton } from "@/components/form/order/EditOrderCard/CreateShipOrderButton";
import { StartProcessingOrderButton } from "@/components/form/order/EditOrderCard/StartProcessingOrderButton";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function PaymentInformationCard({ order }: { order: Order }) {
  const can = usePermission();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payment Information</span>
          {order.payment.status === PAYMENT_STATUS.PENDING &&
            order.payment.paymentMethod === ONLINE_PAYMENT_METHOD.MOMO && (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                }}
                className="w-8 h-8"
                variant={"outline"}
                size={"icon"}
              >
                <ExternalLink />
              </Button>
            )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="capitalize">{order.payment.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Status:</span>
            <BadgePaymentStatus status={order.payment.status} />
          </div>
        </div>

        {can(PERMISSIONS.CONFIRM_ORDER) && <ConfirmOrderButton order={order} />}
        {can(PERMISSIONS.PROCESSING_ORDER) && <StartProcessingOrderButton order={order} />}
        {can(PERMISSIONS.CREATE_SHIP_ORDER) && <CreateShipOrderButton order={order} />}
      </CardContent>

      {order.payment.status === PAYMENT_STATUS.PENDING &&
        order.payment.paymentMethod === ONLINE_PAYMENT_METHOD.MOMO && (
          <PaymentInformationDialog open={openDialog} onOpenChange={setOpenDialog} order={order} />
        )}
    </Card>
  );
}
