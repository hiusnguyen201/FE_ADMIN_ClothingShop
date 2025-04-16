import { apiInstance } from "@/redux/api";
import {
  GetListDistrictPayload,
  GetListDistrictResponse,
  GetListProvinceResponse,
  GetListWardPayload,
  GetListWardResponse,
} from "@/redux/division/division.type";

export const getListProvinceService = async (): Promise<GetListProvinceResponse> => {
  return await apiInstance.get("/divisions/get-provinces");
};

export const getListDistrictService = async (payload: GetListDistrictPayload): Promise<GetListDistrictResponse> => {
  return await apiInstance.get(`/divisions/get-districts-by-province-code/${payload.provinceCode}`);
};

export const getListWardService = async (payload: GetListWardPayload): Promise<GetListWardResponse> => {
  return await apiInstance.get(`/divisions/get-wards-by-district-code/${payload.districtCode}`);
};
