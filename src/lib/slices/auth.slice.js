import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "@/api/auth.api";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  accessToken: null,
  is2FactorRequired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      state.accessToken = null;
      state.is2FactorRequired = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = action.payload.data.isAuthenticated;
        state.is2FactorRequired = action.payload.data.is2FactorRequired;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.is2FactorRequired = false;
      })
      //login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = action.payload.data.isAuthenticated;
        state.is2FactorRequired = action.payload.data.is2FactorRequired;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.is2FactorRequired = false;
      })

      //verify-otp
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = action.payload.data.isAuthenticated;
        state.is2FactorRequired = action.payload.data.is2FactorRequired;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.is2FactorRequired = false;
      })
      //forgot-password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
      })

      //verify-otp
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logoutAction } = authSlice.actions;

export default authSlice.reducer;

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.register(payload);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(payload);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// export const login = createAsyncThunk(
//   "auth/login",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await authApi.login(payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const sendOtpVerifyEmail = createAsyncThunk(
  "auth/send-otp-via-email",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.sendOtpVerifyEmail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.verifyOtpEmail(payload);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.forgotPassword(payload);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.resetPassword(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
