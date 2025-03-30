import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

/**
 * State
 */
export interface AuthState {
  loading: {
    login: boolean;
    sendOtpViaEmail: boolean;
  };
  user: Nullable<User>;
  isAuthenticated: boolean;
  error: Nullable<string>;
}

/**
 * Login
 */
export type LoginPayload = {
  email: string;
  password: string;
};
export interface LoginResponseData {
  isAuthenticated: boolean;
  is2FactorRequired: boolean;
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface LoginResponse extends BaseResponse<LoginResponseData> {}

/**
 * Send OTP Via Email
 */
export type SendOtpViaEmailPayload = {
  email: string;
};
export interface SendOtpViaEmailResponse extends BaseResponse<null> {}
