import apiInstance from "@/api";

export const register = ({ name, email, password, confirmPassword, phone }) => {
  return apiInstance.post("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
    phone,
  });
};

export const login = ({ email, password }) => {
  return apiInstance.post("/auth/login", {
    email,
    password,
  });
};

export const sendOtpVerifyEmail = (email) => {
  return apiInstance.post("/auth/send-otp-via-email", {
    email,
  });
};

export const verifyOtpEmail = ({ email, otp }) => {
  return apiInstance.post("/auth/verify-otp", {
    email,
    otp,
  });
};

export const forgotPassword = ({ email, callbackUrl }) => {
  return apiInstance.post("/auth/forgot-password", {
    email,
    callbackUrl,
  });
};

export const resetPassword = ({ password, confirmPassword }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  return apiInstance.post(`/auth/reset-password/${token}`, {
    password,
    confirmPassword,
  });
};
