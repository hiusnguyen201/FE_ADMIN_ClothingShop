import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getOrder } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { Order } from "@/types/order";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type OrderGuardChildrenProps = { order: Nullable<Order>; checkExistLoading: boolean };

export type OrderExistsGuardProps = {
  children: ({ order, checkExistLoading }: OrderGuardChildrenProps) => ReactNode;
};

export function OrderExistsGuard({ children }: OrderExistsGuardProps) {
  const { orderId } = useParams();
  if (!orderId) return <Navigate to="/orders" />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<OrderState>((selector) => selector.order);

  const initialize = async () => {
    try {
      await dispatch(getOrder({ id: orderId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [orderId]);

  return children({ order: item, checkExistLoading: loading.getOrder });
}
