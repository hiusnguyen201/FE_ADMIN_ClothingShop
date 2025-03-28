import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse, SendOtpViaEmailResponse } from "@/redux/auth/auth.type";
import { login, sendOtpViaEmail } from "@/redux/auth/auth.thunk";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: {
    login: false,
    sendOtpViaEmail: false,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    // Login
    builder
      .addCase(login.pending, (state: Draft<AuthState>) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: Draft<AuthState>, action: PayloadAction<LoginResponse>) => {
        const { data } = action.payload;
        state.loading.login = false;
        state.isAuthenticated = true;
        state.user = data.user;
        state.error = null;
      })
      .addCase(login.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.login = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Send OTP via email
    builder
      .addCase(sendOtpViaEmail.pending, (state: Draft<AuthState>) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(sendOtpViaEmail.fulfilled, (state: Draft<AuthState>, _: PayloadAction<SendOtpViaEmailResponse>) => {
        state.loading.sendOtpViaEmail = false;
        state.error = null;
      })
      .addCase(sendOtpViaEmail.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.sendOtpViaEmail = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
