import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountService from "./account.service";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Get Profile Case
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.user = null;
      });
  },
});

export default accountSlice.reducer;

export const getProfile = createAsyncThunk("account/get-profile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await accountService.getProfile();
    return data.data;
  } catch (error) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    return rejectWithValue(message);
  }
});
