import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "@/api/auth.api";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  accessToken: null,
  is2FactorRequired: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.is2FactorRequired = action.payload.is2FactorRequired;
      state.user = action.payload.user;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { startLoading, hasError, loginSuccess, registerSuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await authApi.registerUser(userData);
    dispatch(registerSuccess(data || []));
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    dispatch(hasError(error?.response?.data?.message || "Register failed"));
  }
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await authApi.loginUser(userData);
      const data = response.data;

      if (response.status === 200 && data) {
        dispatch(loginSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      } else {
        throw new Error("Login failed, please check your credentials.");
      }
      // const { data } = await authApi.loginUser(userData);
      // dispatch(loginSuccess(data.data));
      // localStorage.setItem("user", JSON.stringify(data.data.user));
      // return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed";
      dispatch(hasError(errorMessage)); // Dispatch lỗi
      return rejectWithValue(errorMessage);
    }
  }
);
// export const login = (userData) => async (dispatch) => {
//   try {
//     dispatch(startLoading());
//     const { data } = await authApi.loginUser(userData);
//     dispatch(loginSuccess(data.data));
//     localStorage.setItem("user", JSON.stringify(data.data.user));
//   } catch (error) {
//     const errorMessage =
//       error?.response?.data?.message ||
//       error.message ||
//       "An error occurred during login.";
//     dispatch(hasError(errorMessage));
//   }
// };

export const sendOtpVerifyEmail = (email) => async (dispatch) => {
  try {
    const { data } = await authApi.sendOtpVerifyEmail(email);
    return data;
  } catch (error) {
    dispatch(hasError(error?.response?.data || "Send otp verify failed"));
  }
};
