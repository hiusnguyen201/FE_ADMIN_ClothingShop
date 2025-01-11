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
  // reducers: {
  //   startLoadingAction: (state) => {
  //     state.isLoading = true;
  //   },
  //   hasErrorAction: (state, action) => {
  //     state.error = action.payload;
  //     state.isLoading = false;
  //     state.user = null;
  //     state.accessToken = null;
  //     state.isAuthenticated = false;
  //     state.is2FactorRequired = false;
  //   },
  //   registerAction: (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //     state.error = null;
  //   },
  //   loginAction: (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload.user;
  //     state.error = null;
  //     state.accessToken = action.payload.accessToken;
  //     state.isAuthenticated = action.payload.isAuthenticated;
  //     state.is2FactorRequired = action.payload.is2FactorRequired;
  //   },
  //   verifyOtpAction: (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload.user;
  //     state.error = null;
  //     state.accessToken = action.payload.accessToken;
  //   },
  //   logoutAction: (state) => {
  //     state.user = null;
  //     state.isAuthenticated = false;
  //     state.error = null;
  //   },
  // },
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
        console.log(action.payload.data.user);
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
