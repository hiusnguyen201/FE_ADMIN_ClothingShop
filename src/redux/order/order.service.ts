import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateOrderResponse,
  GetListOrderPayload,
  GetListOrderResponse,
  CreateOrderPayload,
  GetOrderPayload,
  GetOrderResponse,
  // EditOrderInfoPayload,
  // EditOrderInfoResponse,
  RemoveOrderPayload,
  RemoveOrderResponse,
  ConfirmOrderPayload,
  ConfirmOrderResponse,
  CancelOrderPayload,
  CancelOrderResponse,
  ProcessingOrderPayload,
  ProcessingOrderResponse,
} from "@/redux/order/order.type";

export const createOrderService = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
  return await apiInstance.post("/orders/create-order", payload);
};

export const getListOrderService = async (payload: GetListOrderPayload): Promise<GetListOrderResponse> => {
  return await apiInstance.get(`/orders/get-orders?${convertToSearchParams(payload)}`);
};

export const getOrderService = async (payload: GetOrderPayload): Promise<GetOrderResponse> => {
  return await apiInstance.get(`/orders/get-order-by-id/${payload.id}`);
};

// export const editOrderInfoService = async (payload: EditOrderInfoPayload): Promise<EditOrderInfoResponse> => {
//   return await apiInstance.put(`/orders/update-order-by-id/${payload.id}`, payload);
// };

export const removeOrderService = async (payload: RemoveOrderPayload): Promise<RemoveOrderResponse> => {
  return await apiInstance.delete(`/orders/remove-order-by-id/${payload.id}`);
};

export const confirmOrderService = async (payload: ConfirmOrderPayload): Promise<ConfirmOrderResponse> => {
  return await apiInstance.post("/orders/confirm-order", {
    orderId: payload.id,
  });
};

export const processingOrderService = async (payload: ProcessingOrderPayload): Promise<ProcessingOrderResponse> => {
  return await apiInstance.post("/orders/processing-order", {
    orderId: payload.id,
  });
};

export const cancelOrderService = async (payload: CancelOrderPayload): Promise<CancelOrderResponse> => {
  return await apiInstance.post("/orders/cancel-order", {
    orderId: payload.id,
  });
};

export const createShipOrderService = async (payload: CancelOrderPayload): Promise<CancelOrderResponse> => {
  return await apiInstance.post("/orders/create-shipping-order", {
    orderId: payload.id,
  });
};
