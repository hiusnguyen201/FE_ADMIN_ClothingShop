import { Customer } from "@/types/customer";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import { Product, ProductVariant } from "@/types/product";

export enum ORDER_STATUS {
  PENDING = "pending",
  PENDING_PAYMENT = "pending payment",
  CONFIRMED = "confirmed",
  SHIPPING = "shipping",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export type OrderStatusHistory = {
  id: string;
  status: ORDER_STATUS;
  changedAt: Date;
  assignedTo: User;
  trackingNumber: string;
  shippingCarrier: "GHN";
  expectedShipDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  id: string;
  orderDate: Date;

  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customer: Customer;

  provinceName: string;
  districtName: string;
  wardName: string;
  address: string;

  code: string;
  quantity: number;
  subTotal: number;
  total: number;
  shippingFee: number;

  notes: string;

  orderStatusHistory: OrderStatusHistory[];
  orderDetails: OrderItem[];
  payment: Payment;
};
