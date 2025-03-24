import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials);

export const refreshToken = async (token) => axios.post(`${BASE_URL}/auth/refresh-token`, { token });

export const sendOtpViaEmail = async (email) => axios.post(`${BASE_URL}/auth/send-otp-via-email`, { email });

export default { login, refreshToken, sendOtpViaEmail };
