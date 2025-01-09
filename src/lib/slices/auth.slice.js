import { createSlice } from "@reduxjs/toolkit";
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
    startLoadingAction: (state) => {
      state.isLoading = true;
    },
    hasErrorAction: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.is2FactorRequired = false;
    },
    registerAction: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginAction: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.is2FactorRequired = action.payload.is2FactorRequired;
    },
    logoutAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  startLoadingAction,
  hasErrorAction,
  registerAction,
  loginAction,
  logoutAction,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(startLoadingAction());
    const { data } = await authApi.register(userData);
    dispatch(registerAction(data || []));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch(
      hasErrorAction(error?.response?.data?.message || "Register failed")
    );
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    dispatch(startLoadingAction());
    const { data } = await authApi.login(payload);
    dispatch(loginAction(data.data));
    localStorage.setItem("user", JSON.stringify(data.data.user));
    return data;
  } catch (error) {
    dispatch(hasErrorAction(error?.response?.data || error));
  }
};

// export const sendOtpVerifyEmail = (email) => async (dispatch) => {
//   try {
//     const { data } = await authApi.sendOtpVerifyEmail(email);
//     return data;
//   } catch (error) {
//     dispatch(hasError(error?.response?.data || "Send otp verify failed"));
//   }
// };
