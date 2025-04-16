import { Customer } from "@/types/customer";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import { Product, ProductVariant } from "@/types/product";

export enum ORDER_STATUS {
  PENDING = "pending",
  PENDING_PAYMENT = "pending payment",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  WAIT_FOR_PICKUP = "wait for pickup",
  SHIPPING = "shipping",
  COMPLETED = "completed",
  CANCEL = "cancel",
}

export type OrderStatusHistory = {
  id: string;
  status: ORDER_STATUS;
  changedAt: Date;
  assignedTo: User;
  trackingNumber: string;
  shippingCarrier: "GHN";
  expectedShipDate: Date;
};

export type OrderItem = {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isFixed: boolean;
  discount: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customer: Customer;

  provinceName: string;
  districtName: string;
  wardName: string;
  shippingAddress: string;

  code: string;
  quantity: number;
  subTotal: number;
  total: number;
  shippingFee: number;

  orderStatusHistory: OrderStatusHistory[];
  orderDetails: OrderItem[];
  payment: Payment;
};
