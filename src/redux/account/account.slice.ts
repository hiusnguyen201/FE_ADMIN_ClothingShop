import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountState,
  EditProfileResponse,
  GetListNotificationInUserResponse,
  GetPermissionsInUserResponse,
  GetProfileResponse,
  MarkAllAsReadNotificationInUserResponse,
  MarkAsReadNotificationInUserResponse,
} from "@/redux/account/account.type";
import {
  changePassword,
  editProfile,
  getListNotificationInUser,
  getPermissionsInUser,
  getProfile,
  markAllAsReadNotificationInUser,
  markAsReadNotificationInUser,
} from "@/redux/account/account.thunk";

const initialState: AccountState = {
  loading: {
    getProfile: false,
    editProfile: false,
    changePassword: false,
    getPermissionsInUser: false,
    getListNotificationInUser: false,
    markAsReadNotificationInUser: false,
    markAllAsReadNotificationInUser: false,
  },
  totalCount: {
    totalUnreadNotifications: 0,
  },
  user: null,
  userNotifications: [],
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

    builder
      // Get list user notification
      .addCase(getListNotificationInUser.pending, (state: Draft<AccountState>) => {
        state.loading.getListNotificationInUser = true;
        state.error = null;
      })
      .addCase(
        getListNotificationInUser.fulfilled,
        (state: Draft<AccountState>, action: PayloadAction<GetListNotificationInUserResponse>) => {
          const { data } = action.payload;
          state.loading.getListNotificationInUser = false;
          state.userNotifications = data.notifications;
          state.totalCount.totalUnreadNotifications = data.totalUnread;
          state.error = null;
        }
      )
      .addCase(getListNotificationInUser.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.getListNotificationInUser = false;
        state.error = action.payload as string;
        state.userNotifications = [];
        state.totalCount.totalUnreadNotifications = 0;
        state.user = null;
      });

    builder
      // Mark as read user notification
      .addCase(markAsReadNotificationInUser.pending, (state: Draft<AccountState>) => {
        state.loading.markAsReadNotificationInUser = true;
        state.error = null;
      })
      .addCase(
        markAsReadNotificationInUser.fulfilled,
        (state: Draft<AccountState>, action: PayloadAction<MarkAsReadNotificationInUserResponse>) => {
          const { data } = action.payload;
          state.loading.markAsReadNotificationInUser = false;
          state.userNotifications = state.userNotifications.map((item) =>
            item.id === data.id ? { ...item, isRead: data.isRead, readAt: data.readAt } : item
          );
          state.totalCount.totalUnreadNotifications = Math.max(state.totalCount.totalUnreadNotifications - 1, 0);
          state.error = null;
        }
      )
      .addCase(markAsReadNotificationInUser.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.markAsReadNotificationInUser = false;
        state.error = action.payload as string;
        state.userNotifications = [];
        state.user = null;
      });

    builder
      // Mark all as read user notification
      .addCase(markAllAsReadNotificationInUser.pending, (state: Draft<AccountState>) => {
        state.loading.markAllAsReadNotificationInUser = true;
        state.error = null;
      })
      .addCase(
        markAllAsReadNotificationInUser.fulfilled,
        (state: Draft<AccountState>, action: PayloadAction<MarkAllAsReadNotificationInUserResponse>) => {
          const { data } = action.payload;
          state.loading.markAllAsReadNotificationInUser = false;
          state.userNotifications = state.userNotifications.map((noti) => {
            const updatedItem = data.find((item) => item.id === noti.id);
            return updatedItem ? { ...noti, isRead: updatedItem.isRead, readAt: updatedItem.readAt } : noti;
          });
          state.totalCount.totalUnreadNotifications = 0;
          state.error = null;
        }
      )
      .addCase(markAllAsReadNotificationInUser.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.markAllAsReadNotificationInUser = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export default accountSlice.reducer;
