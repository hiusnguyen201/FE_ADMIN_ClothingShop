import { apiInstance } from "@/redux/api";
import { GetListOptionResponse } from "@/redux/option/option.type";

export const getListOptionService = async (): Promise<GetListOptionResponse> => {
  return await apiInstance.get(`/options`);
};
