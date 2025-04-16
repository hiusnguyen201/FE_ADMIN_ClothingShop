import { Nullable } from "@/types/common";
import { Province, Ward, District } from "@/types/division";
import { GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface DivisionState {
  loading: {
    getListProvince: boolean;
    getListDistrict: boolean;
    getListWard: boolean;
  };
  list: {
    provinces: Province[];
    districts: District[];
    wards: Ward[];
  };
  error: Nullable<string>;
}

/**
 * Get List Division
 */
export interface GetListProvinceResponse extends GetListResponseData<Province> {}

/**
 * Get List District by province code
 */
export interface GetListDistrictPayload {
  provinceCode: string;
}
export interface GetListDistrictResponse extends GetListResponseData<District> {}

/**
 * Get List Ward by district code
 */
export interface GetListWardPayload {
  districtCode: string;
}
export interface GetListWardResponse extends GetListResponseData<Ward> {}
