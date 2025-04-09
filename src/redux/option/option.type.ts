import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { Option } from "@/types/option";

/**
 * State
 */
export interface OptionState {
  loading: {
    getListOption: boolean;
  };
  item: Nullable<Option>;
  list: Option[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get List Option
 */
export interface GetListOptionResponse extends BaseResponse<Option[]> {}
