import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Product, PRODUCT_STATUS } from "@/types/product";

/**
 * State
 */
export interface ProductState {
  loading: {
    checkProductNameExist: boolean;
    createProduct: boolean;
    getListProduct: boolean;
    getProduct: boolean;
    editProductInfo: boolean;
    editProductVariants: boolean;
    removeProduct: boolean;
  };
  newItem: Nullable<Product>;
  item: Nullable<Product>;
  list: Product[];
  initializedList: boolean;
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Check Product name exist
 */
export type CheckProductNameExistPayload = {
  name: string;
  skipId?: string;
};
export interface CheckProductNameExistResponse extends BaseResponse<boolean> {}

/**
 * Create Product
 */

export type CreateProductPayload = {
  thumbnail: Nullable<File>;
  name: string;
  description: string;
  category: string;
  subCategory: Nullable<string>;
};
export interface CreateProductResponse extends BaseResponse<Product> {}

/**
 * Get List Product
 */
type ProductFieldsSort = Extract<"name" | "email" | "createdAt", Product>;
export interface GetListProductPayload extends GetListParams<Product> {
  sortBy?: Optional<Nullable<ProductFieldsSort>>;
  status?: Optional<Nullable<PRODUCT_STATUS>>;
  category?: Optional<Nullable<string>>;
}
export interface GetListProductResponse extends GetListResponseData<Product> {}

/**
 * Get Product
 */
export interface GetProductPayload {
  id: string;
}
export interface GetProductResponse extends BaseResponse<Product> {}

/**
 * Edit Product Info
 */
export type EditProductInfoPayload = {
  id: string;
  thumbnail: File | string;
  description: string;
  name: string;
  category: string;
  subCategory?: Nullable<string>;
  status: PRODUCT_STATUS;
};
export interface EditProductInfoResponse extends BaseResponse<Product> {}

/**
 * Edit Product Variants
 */

export type CreateProductVariantValue = {
  option: string;
  optionValue: string;
};
export type CreateProductVariant = {
  quantity: number;
  price: number;
  sku: Nullable<string>;
  variantValues: CreateProductVariantValue[];
};
export type SelectedOption = {
  option: string;
  selectedValues: string[];
};
export type EditProductVariantsPayload = {
  id: string;
  options: SelectedOption[];
  productVariants: CreateProductVariant[];
};
export interface EditProductVariantsResponse extends BaseResponse<Product> {}

/**
 * Remove Product
 */
export type RemoveProductPayload = {
  id: string;
};
export interface RemoveProductResponse extends BaseResponse<{ id: string }> {}
