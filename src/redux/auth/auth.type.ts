import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

/**
 * State
 */
export interface AuthState {
  loading: {
    logout: boolean;
    login: boolean;
    sendOtpViaEmail: boolean;
    verifyOtp: boolean;
  };
  user: Nullable<User>;
  isAuthenticated: boolean;
  error: Nullable<string>;
}

/**
 * Logout
 */
export interface LogoutResponse extends BaseResponse<null> {}

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
}
export interface LoginResponse extends BaseResponse<LoginResponseData> {}

/**
 * Send OTP Via Email
 */
export type SendOtpViaEmailPayload = {
  email: string;
};
export interface SendOtpViaEmailResponse extends BaseResponse<null> {}

/**
 * Verify OTP
 */
export type VerifyOtpPayload = {
  userId: string;
  otp: string;
};
export interface VerifyOtpResponse extends BaseResponse<LoginResponseData> {}

/**
 * Refresh token
 */
export interface RefreshTokenResponse extends BaseResponse<User> {}
