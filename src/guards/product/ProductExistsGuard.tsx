import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getProduct } from "@/redux/product/product.thunk";
import { ProductState } from "@/redux/product/product.type";
import { Product } from "@/types/product";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type ProductGuardChildrenProps = { product: Nullable<Product>; checkExistLoading: boolean };

export type ProductExistsGuardProps = {
  children: ({ product, checkExistLoading }: ProductGuardChildrenProps) => ReactNode;
};

export function ProductExistsGuard({ children }: ProductExistsGuardProps) {
  const { productId } = useParams();
  if (!productId) return <Navigate to="/products" />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<ProductState>((selector) => selector.product);

  const initialize = async () => {
    try {
      await dispatch(getProduct({ id: productId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [productId, dispatch]);

  return children({ product: item, checkExistLoading: loading.getProduct });
}
