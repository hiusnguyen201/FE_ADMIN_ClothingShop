import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { GENDER, Customer } from "@/types/customer";

/**
 * State
 */
export interface CustomerState {
  loading: {
    createCustomer: boolean;
    getListCustomer: boolean;
    getCustomer: boolean;
    editCustomer: boolean;
    removeCustomer: boolean;
    exportListCustomerExcel: boolean;
  };
  newItem: Nullable<Customer>;
  item: Nullable<Customer>;
  list: Customer[];
  initializedList: boolean;
  totalCount: number;
  error: Nullable<string>;
  removedCustomerIds: string[];
}

/**
 * Create Customer
 */
export type CreateCustomerPayload = {
  name: string;
  email: string;
  phone: string;
  gender: GENDER | string;
};
export interface CreateCustomerResponse extends BaseResponse<Customer> {}

/**
 * Get List Customer
 */
export type CustomerFieldsSort = Extract<
  "name" | "email" | "lastLoginAt" | "gender" | "verifiedAt" | "createdAt",
  Customer
>;
export interface GetListCustomerPayload extends GetListParams<Customer> {
  sortBy?: Optional<Nullable<CustomerFieldsSort>>;
  status?: Optional<Nullable<"active" | "inactive">>;
  gender?: Optional<Nullable<GENDER>>;
}
export interface GetListCustomerResponse extends GetListResponseData<Customer> {}

/**
 * Export List Customer To Excel
 */
export interface ExportListCustomerExcelResponse extends Blob {}

/**
 * Get Customer
 */
export interface GetCustomerPayload {
  id: string;
}
export interface GetCustomerResponse extends BaseResponse<Customer> {}

/**
 * Edit Customer
 */
export type EditCustomerInfoPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: GENDER;
};
export interface EditCustomerInfoResponse extends BaseResponse<Customer> {}

/**
 * Remove Customer
 */
export type RemoveCustomerPayload = {
  id: string;
};
export interface RemoveCustomerResponse extends BaseResponse<{ id: string }> {}
