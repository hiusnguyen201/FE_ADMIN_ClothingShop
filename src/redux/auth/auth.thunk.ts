import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, sendOtpViaEmailService } from "@/redux/auth/auth.service";
import { ThunkApiConfig } from "@/types/thunk-api";
import { LoginResponse, LoginPayload, SendOtpViaEmailPayload, SendOtpViaEmailResponse } from "@/redux/auth/auth.type";

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
