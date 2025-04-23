import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountState,
  EditProfileResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
} from "@/redux/account/account.type";
import { changePassword, editProfile, getPermissionsInUser, getProfile } from "@/redux/account/account.thunk";

const initialState: AccountState = {
  loading: {
    getProfile: false,
    editProfile: false,
    changePassword: false,
    getPermissionsInUser: false,
  },
  user: null,
  permissions: [],
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
        state.loading.getProfile = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state: Draft<AccountState>, action: PayloadAction<GetProfileResponse>) => {
        state.loading.getProfile = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.getProfile = false;
        state.error = action.payload as string;
        state.user = null;
      });

    builder
      // Get Permissions In User
      .addCase(getPermissionsInUser.pending, (state: Draft<AccountState>) => {
        state.loading.getPermissionsInUser = true;
        state.error = null;
      })
      .addCase(
        getPermissionsInUser.fulfilled,
        (state: Draft<AccountState>, action: PayloadAction<GetPermissionsInUserResponse>) => {
          state.loading.getPermissionsInUser = false;
          state.error = null;
          state.permissions = action.payload.data;
        }
      )
      .addCase(getPermissionsInUser.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.getPermissionsInUser = false;
        state.error = action.payload as string;
        state.permissions = [];
      });

    builder
      // Edit Profile Case
      .addCase(editProfile.pending, (state: Draft<AccountState>) => {
        state.loading.editProfile = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state: Draft<AccountState>, action: PayloadAction<EditProfileResponse>) => {
        state.loading.editProfile = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(editProfile.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.editProfile = false;
        state.error = action.payload as string;
        state.user = null;
      });

    builder
      // Change password
      .addCase(changePassword.pending, (state: Draft<AccountState>) => {
        state.loading.changePassword = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state: Draft<AccountState>) => {
        state.loading.changePassword = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.changePassword = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export default accountSlice.reducer;
