import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => localStorage.getItem("accessToken");

export const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
