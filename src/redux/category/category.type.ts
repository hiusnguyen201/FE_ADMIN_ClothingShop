import { Nullable, Optional } from "@/types/common";
import { Category } from "@/types/category";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface CategoryState {
  loading: {
    getListCategory: boolean;
    createCategory: boolean;
    checkCategoryNameExist: boolean;
  };
  item: Nullable<Category>;
  list: Category[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get List Category
 */
type CategoryFieldsSort = Extract<"name" | "createdAt", Category>;
export interface GetListCategoryPayload extends GetListParams<Category> {
  sortBy?: Optional<Nullable<CategoryFieldsSort>>;
}
export interface GetListCategoryResponse extends GetListResponseData<Category> {}

/**
 * Create Category
 */
export type CreateCategoryPayload = {
  image: Nullable<File>;
  name: string;
  parent?: string;
};
export interface CreateCategoryResponse extends BaseResponse<Category> {}

/**
 * Check Category Name Exist
 */
export type CheckCategoryNameExistPayload = {
  name: string;
};
export interface CheckCategoryNameExistResponse extends BaseResponse<boolean> {}
