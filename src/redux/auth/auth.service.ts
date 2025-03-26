import axios, { AxiosResponse } from "axios";
import { LoginPayload, LoginResponse, SendOtpViaEmailPayload, SendOtpViaEmailResponse } from "@/redux/auth/auth.type";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response: AxiosResponse = await axios.post<LoginResponse>(`${apiUrl}/auth/login`, payload);
  return response.data;
};

export const sendOtpViaEmailService = async (payload: SendOtpViaEmailPayload): Promise<SendOtpViaEmailResponse> => {
  const response: AxiosResponse = await axios.post(`${apiUrl}/auth/send-otp-via-email`, payload);
  return response.data;
};

// export const refreshTokenService = async (payload: RefreshTokenPayload): Promise<AxiosResponse> =>
//   axios.post(`${apiUrl}/auth/refresh-token`, payload);
