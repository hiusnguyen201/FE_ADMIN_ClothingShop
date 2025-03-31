import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, logoutService, sendOtpViaEmailService } from "@/redux/auth/auth.service";
import { ThunkApiConfig } from "@/types/thunk-api";
import {
  LoginResponse,
  LoginPayload,
  SendOtpViaEmailPayload,
  SendOtpViaEmailResponse,
  LogoutResponse,
} from "@/redux/auth/auth.type";

export const logout = createAsyncThunk<LogoutResponse, void, ThunkApiConfig>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk<LoginResponse, LoginPayload, ThunkApiConfig>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response: LoginResponse = await loginService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const sendOtpViaEmail = createAsyncThunk<SendOtpViaEmailResponse, SendOtpViaEmailPayload, ThunkApiConfig>(
  "auth/send-otp-via-email",
  async (payload, { rejectWithValue }) => {
    try {
      const response: SendOtpViaEmailResponse = await sendOtpViaEmailService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);
