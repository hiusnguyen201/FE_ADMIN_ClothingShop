import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Heading } from "@/components/Heading";
import { FlexBox } from "@/components/FlexBox";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Spinner } from "@/components/spinner";
import { OrderGuardChildrenProps } from "@/guards/order/OrderExistsGuard";
import { Tag } from "@/components/Tag";
import {
  OrderStatusHistoryCard,
  OrderItemsCard,
  CustomerInformationCard,
  ShippingInformationCard,
  PaymentInformationCard,
} from "@/components/form/order/EditOrderCard";
import { CancelOrderButton } from "@/components/form/order/EditOrderCard/CancelOrderButton";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

export function DetailsOrderPage({ order, checkExistLoading }: OrderGuardChildrenProps) {
  const can = usePermission();
  if (!can(PERMISSIONS.READ_DETAILS_ORDER)) return <Navigate to={"/forbidden"} />;

  return (
    <ContentWrapper>
      <FlexBox size="large">
        <FlexBox>
          <Link to={"/orders"} className="flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            <span>Back to Orders</span>
          </Link>
          {checkExistLoading && (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          )}

          {!checkExistLoading && (
            <Heading
              title={order ? `Order #${order?.code}` : "Order"}
              description={
                <div className="flex items-center gap-1">
                  <span>Order ID</span>
                  <Tag>{order?.id || 1}</Tag>
                </div>
              }
            />
          )}
        </FlexBox>

        {/* Main content */}
        {!checkExistLoading && order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6 w-full">
            <div className="space-y-6 lg:col-span-1">
              <PaymentInformationCard order={order} />
              <CustomerInformationCard order={order} />
              <ShippingInformationCard order={order} />
            </div>
            <div className="lg:col-span-2 space-y-6 order-last">
              <OrderStatusHistoryCard orderStatusHistory={order.orderStatusHistory} />

              <OrderItemsCard order={order} />

              <div className="flex items-center justify-end">
                {can(PERMISSIONS.CANCEL_ORDER) && <CancelOrderButton className="max-w-[150px]" order={order} />}
              </div>
            </div>
          </div>
        )}
      </FlexBox>
    </ContentWrapper>
  );
}
