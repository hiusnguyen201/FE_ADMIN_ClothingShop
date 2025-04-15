import { BaseResponse } from "@/types/response";
import { getPreviousPathnameHistory } from "@/utils/history";
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

let retry = false;
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest: AxiosRequestConfig = error.config;

    const responseData = error.response?.data as BaseResponse<null>;

    if (error.response?.status === 401 && responseData.codeMessage === "INVALID_TOKEN" && !retry) {
      try {
        retry = true;

        const response = await refreshTokenFn();
        if (response && response.code === 200) {
          retry = false;
          return apiInstance(originalRequest);
        }
      } catch (e: any) {
        retry = false;
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
