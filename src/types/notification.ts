type NotificationBase = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum NotificationType {
  NEW_ORDER = "new_order",
  NEW_CUSTOMER = "new_customer",
  LOW_STOCK = "low_stock",
  CONFIRM_ORDER = "confirm_order",
  PROCESSING_ORDER = "processing_order",
  READY_FOR_PICKUP = "ready_for_pickup_order",
  SHIPPING_ORDER = "shipping_order",
  CANCEL_ORDER = "cancel_order",
  COMPLETE_ORDER = "complete_order",
}

export type NewOrderMetadata = {
  orderId: string;
  code: string;
  total: number;
};

export type NewCustomerMetadata = {
  customerId: string;
  name: string;
  email: string;
};

export type LowStockMetadata = {
  productId: string;
  variantId: string;
  productName: string;
  quantity: number;
  variantValues: { optionName: string; optionValue: string }[];
};

export type ConfirmOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
};

export type ProcessingOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
};

export type ReadyForPickyOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
};

export type ShippingOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
  trackingNumber: string;
  estimatedDeliveryAt: Date;
};

export type CancelOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
  reason: string;
};

export type CompleteOrderMetadata = {
  orderId: string;
  customerName: string;
  code: string;
  total: number;
};

type NotificationMetadataMap = {
  [NotificationType.NEW_ORDER]: NewOrderMetadata;
  [NotificationType.NEW_CUSTOMER]: NewCustomerMetadata;
  [NotificationType.LOW_STOCK]: LowStockMetadata;
  [NotificationType.CONFIRM_ORDER]: ConfirmOrderMetadata;
  [NotificationType.PROCESSING_ORDER]: ProcessingOrderMetadata;
  [NotificationType.READY_FOR_PICKUP]: ReadyForPickyOrderMetadata;
  [NotificationType.SHIPPING_ORDER]: ShippingOrderMetadata;
  [NotificationType.CANCEL_ORDER]: CancelOrderMetadata;
  [NotificationType.COMPLETE_ORDER]: CompleteOrderMetadata;
};

export type AnyNotification =
  | Notification<NotificationType.NEW_ORDER>
  | Notification<NotificationType.NEW_CUSTOMER>
  | Notification<NotificationType.LOW_STOCK>
  | Notification<NotificationType.CONFIRM_ORDER>
  | Notification<NotificationType.PROCESSING_ORDER>
  | Notification<NotificationType.READY_FOR_PICKUP>
  | Notification<NotificationType.SHIPPING_ORDER>
  | Notification<NotificationType.CANCEL_ORDER>
  | Notification<NotificationType.COMPLETE_ORDER>;

export type Notification<T extends NotificationType> = NotificationBase & {
  type: T;
  metadata: NotificationMetadataMap[T];
};

export type UserNotification = {
  id: string;
  user: string;
  notification: AnyNotification;
  isRead: boolean;
  readAt: Date;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
