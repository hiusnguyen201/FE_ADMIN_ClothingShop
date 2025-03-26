import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

export interface AuthState {
  user: Nullable<User>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Nullable<string>;
}

// ===============================LOGIN=================================== //

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

// ============================SEND OTP VIA EMAIL=========================== //

export type SendOtpViaEmailPayload = {
  email: string;
};

export interface SendOtpViaEmailResponse extends BaseResponse<null> {}
