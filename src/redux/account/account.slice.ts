import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AccountState, GetProfileResponse } from "@/redux/account/account.type";
import { getProfile } from "@/redux/account/account.thunk";

const initialState: AccountState = {
  user: null,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AccountState>) => {
    builder
      // Get Profile Case
      .addCase(getProfile.pending, (state: Draft<AccountState>) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state: Draft<AccountState>, action: PayloadAction<GetProfileResponse>) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export default accountSlice.reducer;
