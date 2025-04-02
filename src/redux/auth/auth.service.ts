import { apiInstance } from "@/redux/api";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  SendOtpViaEmailPayload,
  SendOtpViaEmailResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/redux/auth/auth.type";

export const logoutService = async (): Promise<LogoutResponse> => {
  return await apiInstance.post("/auth/logout");
};

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  return await apiInstance.post("/auth/login-admin", payload);
};

export const sendOtpViaEmailService = async (payload: SendOtpViaEmailPayload): Promise<SendOtpViaEmailResponse> => {
  return await apiInstance.post("/auth/send-otp-via-email", payload);
};

export const verifyOtpService = async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  return await apiInstance.post("/auth/verify-otp", payload);
};
