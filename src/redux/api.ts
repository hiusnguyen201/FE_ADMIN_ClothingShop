import { BaseResponse } from "@/types/response";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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

        const response = await apiInstance.post("/auth/refresh-token");
        if (response.status === 200) {
          retry = false;
          return apiInstance(originalRequest);
        }
      } catch (e: any) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
