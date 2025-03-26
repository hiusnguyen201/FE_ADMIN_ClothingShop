import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Role, ROLE_STATUS } from "@/types/role";

export interface RoleState {
  item: Nullable<Role>;
  list: Role[];
  totalCount: number;
  isLoading: boolean;
  error: Nullable<string>;
  isInitialized: boolean;
}

export type SortByField = Extract<"name" | "email" | "createdAt", Role>;

export interface GetListRoleParams extends GetListParams<Role> {
  sortBy: Optional<Nullable<SortByField>>;
  status: Optional<Nullable<ROLE_STATUS>>;
}

export interface GetListRoleResponse extends GetListResponseData<Role> {}

export type CreateRolePayload = {
  name: string;
  description: string;
  status: ROLE_STATUS;
};

export interface CreateRoleResponse extends BaseResponse<Role> {}

export type CheckRoleNameExistPayload = {
  name: string;
};

export interface CheckRoleNameExistResponse extends BaseResponse<boolean> {}
