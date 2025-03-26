import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

export interface AccountState {
  user: Nullable<User>;
  isLoading: boolean;
  error: Nullable<string>;
}

export interface GetProfileResponse extends BaseResponse<User> {}
