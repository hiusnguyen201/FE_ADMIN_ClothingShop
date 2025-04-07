import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  GetListCategoryPayload,
  GetListCategoryResponse,
  CreateCategoryPayload,
  CreateCategoryResponse,
  CheckCategoryNameExistPayload,
  CheckCategoryNameExistResponse,
  GetCategoryPayload,
  GetCategoryResponse,
  EditCategoryInfoPayload,
  EditCategoryInfoResponse,
  RemoveCategoryPayload,
  RemoveCategoryResponse,
  GetListSubcategoryPayload,
  GetListSubcategoryResponse,
} from "@/redux/category/category.type";

export const checkCategoryNameExistService = async (
  payload: CheckCategoryNameExistPayload
): Promise<CheckCategoryNameExistResponse> => {
  return await apiInstance.post("/categories/is-exist-category-name", payload);
};

export const createCategoryService = async (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> => {
  return await apiInstance.post(`/categories/create-category`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getListCategoryService = async (payload: GetListCategoryPayload): Promise<GetListCategoryResponse> => {
  return await apiInstance.get(`/categories/get-categories?${convertToSearchParams(payload)}`);
};

export const getCategoryService = async (payload: GetCategoryPayload): Promise<GetCategoryResponse> => {
  return await apiInstance.get(`/categories/get-category-by-id/${payload.id}`);
};

export const editCategoryInfoService = async (payload: EditCategoryInfoPayload): Promise<EditCategoryInfoResponse> => {
  return await apiInstance.put(`/categories/update-category-by-id/${payload.id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeCategoryService = async (payload: RemoveCategoryPayload): Promise<RemoveCategoryResponse> => {
  return await apiInstance.delete(`/categories/remove-category-by-id/${payload.id}`);
};

export const getListSubcategoryService = async (
  payload: GetListSubcategoryPayload
): Promise<GetListSubcategoryResponse> => {
  return await apiInstance.get(`/categories/${payload.categoryId}/subcategories?${convertToSearchParams(payload)}`);
};
