import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Order } from "@/types/order";
import { PAYMENT_METHOD } from "@/types/payment";

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
  };
  item: Nullable<Order>;
  list: Order[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Create Order
 */
type CreateOrderItemPayload = {
  variantId: string;
  quantity: number;
};

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
  shippingAddress: string;

  // Items
  productVariants: CreateOrderItemPayload[];

  // Payment
  paymentMethod: PAYMENT_METHOD;
};
export interface CreateOrderResponse extends BaseResponse<Order> {}

/**
 * Get List Order
 */
type OrderFieldsSort = Extract<"name" | "email" | "createdAt", Order>;
export interface GetListOrderPayload extends GetListParams<Order> {
  sortBy: Optional<Nullable<OrderFieldsSort>>;
}
export interface GetListOrderResponse extends GetListResponseData<Order> {}

/**
 * Get Order
 */
export interface GetOrderPayload {
  id: string;
}
export interface GetOrderResponse extends BaseResponse<Order> {}

/**
 * Edit Order
 */
export type EditOrderInfoPayload = {
  id: string;
};
export interface EditOrderInfoResponse extends BaseResponse<Order> {}

/**
 * Remove Order
 */
export type RemoveOrderPayload = {
  id: string;
};
export interface RemoveOrderResponse extends BaseResponse<{ id: string }> {}
