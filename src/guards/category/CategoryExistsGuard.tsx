import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getCategory } from "@/redux/category/category.thunk";
import { CategoryState } from "@/redux/category/category.type";
import { Category } from "@/types/category";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type CategoryGuardChildrenProps = { category: Nullable<Category>; checkExistLoading: boolean };

export type CategoryExistsGuardProps = {
  children: ({ category, checkExistLoading }: CategoryGuardChildrenProps) => ReactNode;
};

export function CategoryExistsGuard({ children }: CategoryExistsGuardProps) {
  const { categoryId } = useParams();
  if (!categoryId) return <Navigate to="/categories" />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<CategoryState>((selector) => selector.category);

  const initialize = async () => {
    try {
      await dispatch(getCategory({ id: categoryId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [categoryId]);

  return children({ category: item, checkExistLoading: loading.getCategory });
}
