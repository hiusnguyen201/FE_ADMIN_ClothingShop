import { BaseResponse } from "@/types/response";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RefreshTokenResponse } from "@/redux/auth/auth.type";

type RefreshTokenFn = () => Promise<RefreshTokenResponse | void>;
let refreshTokenFn: RefreshTokenFn = async () => {};

export const setAuthUtils = (utils: { refreshToken: RefreshTokenFn }) => {
  refreshTokenFn = utils.refreshToken;
};

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    const responseData = error.response?.data as BaseResponse<null>;
    originalRequest._retry = false;

    if (error.response?.status === 401 && responseData.codeMessage === "INVALID_TOKEN" && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const response = await refreshTokenFn();
        if (response && response.code === 200) {
          originalRequest._retry = false;
          return apiInstance(originalRequest);
        }
      } catch (e: any) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
