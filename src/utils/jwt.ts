import { Nullable } from "@/types/common";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const getAccessToken = (): Nullable<string> => localStorage.getItem("accessToken");

export const setSession = (accessToken: Nullable<string>, refreshToken?: Nullable<string>): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) return false;

  const decoded: JwtPayload = jwtDecode(accessToken);
  const currentTime: number = Date.now() / 1000;

  if (!decoded || !decoded.exp) return false;

  return decoded.exp > currentTime;
};
