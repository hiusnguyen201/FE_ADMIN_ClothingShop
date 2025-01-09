import apiInstance from "@/api";

export const register = ({
  name,
  email,
  password,
  confirmPassword,
  phone,
}) => {
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
