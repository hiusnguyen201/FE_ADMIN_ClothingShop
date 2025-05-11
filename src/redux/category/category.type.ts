import { Nullable, Optional } from "@/types/common";
import { Category } from "@/types/category";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface CategoryState {
  loading: {
    checkCategoryNameExist: boolean;
    createCategory: boolean;
    getListCategory: boolean;
    getCategory: boolean;
    editCategory: boolean;
    removeCategory: boolean;
    getListSubcategory: boolean;
  };
  newItem: Nullable<Category>;
  item: Nullable<Category>;
  list: Category[];
  initializedList: boolean;
  initializedSubList: boolean;
  listSub: Category[];
  totalCount: number;
  error: Nullable<string>;
  removedCategoryIds: string[];
}

/**
 * Check Category Name Exist
 */
export type CheckCategoryNameExistPayload = {
  name: string;
};
export interface CheckCategoryNameExistResponse extends BaseResponse<boolean> {}

/**
 * Create Category
 */
export type CreateCategoryPayload = {
  image: Nullable<File>;
  name: string;
  parentId: Nullable<string>;
};
export interface CreateCategoryResponse extends BaseResponse<Category> {}

/**
 * Get List Category
 */
export type CategoryFieldsSort = Extract<"name" | "createdAt", Category>;
export interface GetListCategoryPayload extends GetListParams<Category> {
  sortBy?: Optional<Nullable<CategoryFieldsSort>>;
}
export interface GetListCategoryResponse extends GetListResponseData<Category> {}

/**
 * Get Category
 */
export interface GetCategoryPayload {
  id: string;
}
export interface GetCategoryResponse extends BaseResponse<Category> {}

/**
 * Edit Category
 */
export type EditCategoryInfoPayload = {
  id: string;
  image: File | string;
  name: string;
  parentId: Nullable<string>;
};
export interface EditCategoryInfoResponse extends BaseResponse<Category> {}

/**
 * Remove Category
 */
export type RemoveCategoryPayload = {
  id: string;
};
export interface RemoveCategoryResponse extends BaseResponse<{ id: string }> {}

/**
 * Get List Subcategory
 */
type SubcategoryFieldsSort = Extract<"name" | "createdAt", Category>;
export interface GetListSubcategoryPayload extends GetListParams<Category> {
  categoryId: string;
  sortBy?: Optional<Nullable<SubcategoryFieldsSort>>;
}
export interface GetListSubcategoryResponse extends GetListResponseData<Category> {}
