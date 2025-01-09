import apiInstance from "@/api";

const PREFIX = "/auth";

export const registerUser = ({
  name,
  email,
  password,
  confirmPassword,
  phone,
}) => {
  return apiInstance.post(PREFIX + `/register`, {
    name,
    email,
    password,
    confirmPassword,
    phone,
  });
};
export const loginUser = ({ email, password }) => {
  return apiInstance.post(PREFIX + `/login`, {
    email,
    password,
  });
};

export const sendOtpVerifyEmail = (email) => {
  return apiInstance.post(PREFIX + `/send-otp-via-email`, {
    email,
  });
};
