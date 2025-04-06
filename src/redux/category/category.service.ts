import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  GetListCategoryPayload,
  GetListCategoryResponse,
  CreateCategoryPayload,
  CreateCategoryResponse,
  CheckCategoryNameExistPayload,
  CheckCategoryNameExistResponse,
} from "@/redux/category/category.type";

export const getListCategoryService = async (payload: GetListCategoryPayload): Promise<GetListCategoryResponse> => {
  return await apiInstance.get(`/categories/get-categories?${convertToSearchParams(payload)}`);
};

export const createCategoryService = async (payload: CreateCategoryPayload): Promise<CreateCategoryResponse> => {
  return await apiInstance.post(`/categories/create-category`, payload);
};

export const checkCategoryNameExistService = async (
  payload: CheckCategoryNameExistPayload
): Promise<CheckCategoryNameExistResponse> => {
  return await apiInstance.post("/categories/is-exist-category-name", payload);
};
