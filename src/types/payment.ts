export enum PAYMENT_METHOD {
  COD = "COD",
  MOMO = "MoMo",
  DIRECT = "Direct",
}

export type Payment = {
  id: string;
  paymentMethod: PAYMENT_METHOD;
  amountPaid: number;
  paidDate: Date;
  transactionId: string;
  notes: string;
};
