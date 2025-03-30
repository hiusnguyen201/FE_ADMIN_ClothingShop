import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

/**
 * State
 */
export interface AccountState {
  loading: {
    getProfile: boolean;
  };
  user: Nullable<User>;
  error: Nullable<string>;
}

/**
 * Get Profile
 */
export interface GetProfileResponse extends BaseResponse<User> {}
