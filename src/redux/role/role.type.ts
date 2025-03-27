import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Role, ROLE_STATUS } from "@/types/role";

interface LoadingRoleState {
  createRole: boolean;
  getListRole: boolean;
  getRole: boolean;
  editRole: boolean;
  removeRole: boolean;
}

export interface RoleState {
  loading: LoadingRoleState;
  item: Nullable<Role>;
  list: Role[];
  totalCount: number;
  error: Nullable<string>;
  isInitialized: boolean;
}

export type SortByField = Extract<"name" | "email" | "createdAt", Role>;

export interface GetListRolePayload extends GetListParams<Role> {
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

export interface GetRoleParams {
  id: string;
}

export interface GetRoleResponse extends BaseResponse<Role> {}

export type EditRoleInfoPayload = {
  id: string;
  name?: string;
  description?: string;
  status?: Nullable<ROLE_STATUS>;
};

export interface EditRoleInfoResponse extends BaseResponse<Role> {}

export type RemoveRolePayload = {
  id: string;
};

export interface RemoveRoleResponse extends BaseResponse<{ id: string }> {}
