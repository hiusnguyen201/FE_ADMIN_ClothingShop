import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "@/redux/auth/auth.type";
import { login } from "@/redux/auth/auth.thunk";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(login.pending, (state: Draft<AuthState>) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: Draft<AuthState>, action: PayloadAction<LoginResponse>) => {
        const { data } = action.payload;
        console.log(action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = data.user;
        state.error = null;
      })
      .addCase(login.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
