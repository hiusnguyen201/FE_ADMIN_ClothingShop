import { ReactNode } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Category } from "@/types/category";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RemoveCategoryResponse, CategoryState } from "@/redux/category/category.type";
import { removeCategory } from "@/redux/category/category.thunk";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type RemoveCategoryDialogFormProps = {
  category: Category;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  finishNavigate?: string;
};

export function RemoveCategoryDialogForm({
  category,
  children,
  open,
  onOpenChange,
  finishNavigate = "categories",
}: RemoveCategoryDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);

  const handleRemove = async () => {
    try {
      const response: RemoveCategoryResponse = await dispatch(removeCategory({ id: category.id })).unwrap();
      toast({ title: response.message });
      navigate(finishNavigate);
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <AlertDialog
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      title="Remove Category"
      description={`Are you sure you want to delete category "${category.name}"?`}
      onConfirm={handleRemove}
      loading={loading.removeCategory}
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
}
