import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getCustomer } from "@/redux/customer/customer.thunk";
import { CustomerState } from "@/redux/customer/customer.type";
import { Customer } from "@/types/customer";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type CustomerGuardChildrenProps = { customer: Nullable<Customer>; checkExistLoading: boolean };

export type CustomerExistsGuardProps = {
  children: ({ customer, checkExistLoading }: CustomerGuardChildrenProps) => ReactNode;
};

export function CustomerExistsGuard({ children }: CustomerExistsGuardProps) {
  const { customerId } = useParams();
  if (!customerId) return <Navigate to="/customers" />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<CustomerState>((selector) => selector.customer);

  const initialize = async () => {
    try {
      await dispatch(getCustomer({ id: customerId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [customerId]);

  return children({ customer: item, checkExistLoading: loading.getCustomer });
}
