import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSession } from "@/utils/jwt";
import authService from "./auth.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(credentials);
    const { tokens } = data.data;
    setSession(tokens.accessToken, tokens.refreshToken);
    return data.data;
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const sendOtpViaEmail = createAsyncThunk("auth/send-otp-via-email", async (email, { rejectWithValue }) => {
  try {
    await authService.sendOtpViaEmail(email);
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    return rejectWithValue(message);
  }
});
