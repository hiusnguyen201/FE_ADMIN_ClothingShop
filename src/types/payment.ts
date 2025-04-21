export enum PAYMENT_TYPE {
  OFFLINE = "offline",
  ONLINE = "online",
}

export enum OFFLINE_PAYMENT_METHOD {
  CASH = "cash",
  BANKING = "banking",
}

export enum ONLINE_PAYMENT_METHOD {
  COD = "cash on delivery",
  MOMO = "momo",
}

export enum PAYMENT_STATUS {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export type Payment = {
  id: string;
  qrCodeUrl: string;
  status: string;
  paymentUrl: string;
  paymentMethod: ONLINE_PAYMENT_METHOD;
  amountPaid: number;
  paidDate: Date;
  transactionId: string;
  notes: string;
};
