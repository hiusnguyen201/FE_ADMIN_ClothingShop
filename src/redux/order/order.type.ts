import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Order, ORDER_STATUS, OrderStatusHistory } from "@/types/order";
import { ONLINE_PAYMENT_METHOD } from "@/types/payment";
import { ProductVariant } from "@/types/product";

/**
 * State
 */
export interface OrderState {
  loading: {
    createOrder: boolean;
    getListOrder: boolean;
    getOrder: boolean;
    editOrder: boolean;
    removeOrder: boolean;
    confirmOrder: boolean;
    cancelOrder: boolean;
    shipOrder: boolean;
    createShipOrder: boolean;
    processingOrder: boolean;
  };
  newItem: Nullable<Order>;
  item: Nullable<Order>;
  initializedList: boolean;
  list: Order[];
  totalCount: number;
  error: Nullable<string>;
  removedOrderIds: string[];
}

/**
 * Create Order
 */

export type CreateOrderPayload = {
  // Customer info
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Shipping
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  address: string;

  // Items
  productVariants: (ProductVariant & { product: { id: string; name: string; thumbnail: string } })[];

  // Payment
  paymentMethod: ONLINE_PAYMENT_METHOD;

  selectedProductId: string;
};
export interface CreateOrderResponse extends BaseResponse<Order> {}

/**
 * Get List Order
 */
type OrderFieldsSort = Extract<"name" | "email" | "createdAt", Order>;
export interface GetListOrderPayload extends GetListParams<Order> {
  sortBy?: Optional<Nullable<OrderFieldsSort>>;
  status?: Optional<Nullable<ORDER_STATUS>>;
}
export interface GetListOrderResponse extends GetListResponseData<Order> {}

/**
 * Get Order
 */
export interface GetOrderPayload {
  id: string;
}
export interface GetOrderResponse extends BaseResponse<Order> {}

// /**
//  * Edit Order
//  */
// export type EditOrderInfoPayload = {
//   id: string;
// };
// export interface EditOrderInfoResponse extends BaseResponse<Order> {}

/**
 * Remove Order
 */
export type RemoveOrderPayload = {
  id: string;
};
export interface RemoveOrderResponse extends BaseResponse<{ id: string }> {}

/**
 * Confirm Order
 */
export type ConfirmOrderPayload = {
  id: string;
};
export interface ConfirmOrderResponse extends BaseResponse<Order> {}

/**
 * Processing Order
 */
export type ProcessingOrderPayload = {
  id: string;
};
export interface ProcessingOrderResponse extends BaseResponse<Order> {}

/**
 * Cancel Order
 */
export type CancelOrderPayload = {
  id: string;
};
export interface CancelOrderResponse extends BaseResponse<Order> {}

/**
 * Create Ship Order
 */
export type CreateShipOrderPayload = {
  id: string;
};
export interface CreateShipOrderResponse extends BaseResponse<Order> {}
