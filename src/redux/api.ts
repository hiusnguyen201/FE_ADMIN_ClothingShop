import axios, { AxiosResponse } from "axios";

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
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (retry) {
        retry = false;
        return Promise.reject(error);
      }

      retry = true;

      try {
        await apiInstance.post("/auth/refresh-token");
        return apiInstance(originalRequest);
      } catch (e: any) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
