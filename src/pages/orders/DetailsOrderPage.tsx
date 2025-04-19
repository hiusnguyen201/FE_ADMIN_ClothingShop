import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Heading } from "@/components/Heading";
import { FlexBox } from "@/components/FlexBox";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Spinner } from "@/components/spinner";
import { OrderGuardChildrenProps } from "@/guards/order/OrderExistsGuard";
import { formatDateString } from "@/utils/date";
import { Tag } from "@/components/Tag";
import {
  OrderStatusHistoryCard,
  OrderItemsCard,
  CustomerInformationCard,
  ShippingInformationCard,
  PaymentInformationCard,
} from "@/pages/orders/_components";

export function DetailsOrderPage({ order, checkExistLoading }: OrderGuardChildrenProps) {
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
                order ? (
                  `Placed on ${formatDateString(order?.orderDate, "long")}`
                ) : (
                  <div className="flex items-center gap-1">
                    <span>Order ID</span>
                    <Tag>1</Tag>
                  </div>
                )
              }
            />
          )}
        </FlexBox>

        {/* Main content */}
        {!checkExistLoading && order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6 w-full">
            <div className="lg:col-span-2 space-y-6">
              <OrderStatusHistoryCard orderStatusHistory={order.orderStatusHistory} />
              <OrderItemsCard order={order} />
            </div>
            <div className="space-y-6 lg:col-span-1">
              <CustomerInformationCard order={order} />
              <ShippingInformationCard order={order} />
              <PaymentInformationCard order={order} />
            </div>
          </div>
        )}
      </FlexBox>
    </ContentWrapper>
  );
}
