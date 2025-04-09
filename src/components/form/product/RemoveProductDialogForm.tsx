import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveProductResponse, ProductState } from "@/redux/product/product.type";
import { removeProduct } from "@/redux/product/product.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveProductDialogFormProps = {
  product: Product;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export function RemoveProductDialogForm({ product, children, open, onOpenChange }: RemoveProductDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);

  const handleRemove = async () => {
    try {
      const response: RemoveProductResponse = await dispatch(removeProduct({ id: product.id })).unwrap();
      toast({ title: response.message });
      navigate("/products");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      variant="destructive"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Remove Product"
      description={`Are you sure you want to delete product "${product.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeProduct}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
