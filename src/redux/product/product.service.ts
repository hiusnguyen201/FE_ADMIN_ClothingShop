import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateProductResponse,
  GetListProductPayload,
  GetListProductResponse,
  CreateProductPayload,
  GetProductPayload,
  GetProductResponse,
  EditProductInfoPayload,
  EditProductInfoResponse,
  RemoveProductPayload,
  RemoveProductResponse,
  CheckProductNameExistPayload,
  CheckProductNameExistResponse,
  EditProductVariantsPayload,
  EditProductVariantsResponse,
} from "@/redux/product/product.type";

export const checkProductNameExistService = async (
  payload: CheckProductNameExistPayload
): Promise<CheckProductNameExistResponse> => {
  return await apiInstance.post("/products/is-exist-product-name", payload);
};

export const createProductService = async (payload: CreateProductPayload): Promise<CreateProductResponse> => {
  return await apiInstance.post("/products/create-product", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getListProductService = async (payload: GetListProductPayload): Promise<GetListProductResponse> => {
  return await apiInstance.get(`/products/get-products?${convertToSearchParams(payload)}`);
};

export const getProductService = async (payload: GetProductPayload): Promise<GetProductResponse> => {
  return await apiInstance.get(`/products/get-product-by-id/${payload.id}`);
};

export const editProductInfoService = async (payload: EditProductInfoPayload): Promise<EditProductInfoResponse> => {
  return await apiInstance.put(`/products/update-product-info/${payload.id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const editProductVariantsService = async (
  payload: EditProductVariantsPayload
): Promise<EditProductVariantsResponse> => {
  return await apiInstance.put(`/products/update-product-variants/${payload.id}`, payload);
};

export const removeProductService = async (payload: RemoveProductPayload): Promise<RemoveProductResponse> => {
  return await apiInstance.delete(`/products/remove-product-by-id/${payload.id}`);
};
