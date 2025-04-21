import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateUserResponse,
  EditUserInfoResponse,
  GetListUserPermissionsResponse,
  GetListUserResponse,
  GetUserResponse,
  RemoveUserResponse,
  UserState,
} from "@/redux/user/user.type";
import {
  getListUser,
  createUser,
  getUser,
  editUserInfo,
  removeUser,
  getListUserPermissions,
  editListUserPermissions,
  checkEmailExist,
} from "@/redux/user/user.thunk";

const initialState: UserState = {
  loading: {
    checkEmailExist: false,
    createUser: false,
    getListUser: false,
    getUser: false,
    editUser: false,
    removeUser: false,
    getListUserPermissions: false,
    editListUserPermissions: false,
  },
  newItem: null,
  item: null,
  initializedList: false,
  list: [],
  totalCount: 0,
  error: null,
  listUserPermissions: [],
  deletedUserIds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    // Check Email Exist
    builder
      .addCase(checkEmailExist.pending, (state) => {
        state.loading.checkEmailExist = true;
        state.error = null;
      })
      .addCase(checkEmailExist.fulfilled, (state) => {
        state.loading.checkEmailExist = false;
        state.error = null;
      })
      .addCase(checkEmailExist.rejected, (state, action: PayloadAction<any>) => {
        state.loading.checkEmailExist = false;
        state.error = action.payload;
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.loading.createUser = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<CreateUserResponse>) => {
        const { data } = action.payload;
        state.loading.createUser = false;
        state.error = null;
        state.newItem = data;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createUser = false;
        state.error = action.payload;
        state.newItem = null;
      });

    builder
      // Get List User
      .addCase(getListUser.pending, (state: Draft<UserState>) => {
        state.loading.getListUser = true;
        state.error = null;
      })
      .addCase(getListUser.fulfilled, (state: Draft<UserState>, action: PayloadAction<GetListUserResponse>) => {
        const { data } = action.payload;
        state.loading.getListUser = false;
        state.error = null;
        state.list = data.list;
        state.totalCount = data.totalCount;
        state.initializedList = true;
      })
      .addCase(getListUser.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.getListUser = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
        state.initializedList = true;
      });

    builder
      // Get User
      .addCase(getUser.pending, (state: Draft<UserState>) => {
        state.loading.getUser = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state: Draft<UserState>, action: PayloadAction<GetUserResponse>) => {
        const { data } = action.payload;
        state.loading.getUser = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getUser.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.getUser = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit User Info
      .addCase(editUserInfo.pending, (state: Draft<UserState>) => {
        state.loading.editUser = true;
        state.error = null;
      })
      .addCase(editUserInfo.fulfilled, (state: Draft<UserState>, action: PayloadAction<EditUserInfoResponse>) => {
        const { data } = action.payload;
        state.loading.editUser = false;
        state.error = null;
        state.item = data;
        state.list = state.list.map((item) => (item.id === data.id ? data : item));
      })
      .addCase(editUserInfo.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.editUser = false;
        state.error = action.payload as string;
      });

    builder
      // Remove User
      .addCase(removeUser.pending, (state: Draft<UserState>) => {
        state.loading.removeUser = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state: Draft<UserState>, action: PayloadAction<RemoveUserResponse>) => {
        const { data } = action.payload;
        state.loading.removeUser = false;
        state.error = null;
        state.removedUserIds.push(data.id);
      })
      .addCase(removeUser.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.removeUser = false;
        state.error = action.payload as string;
      });

    builder
      // Get List User Permissions
      .addCase(getListUserPermissions.pending, (state: Draft<UserState>) => {
        state.loading.getListUserPermissions = true;
        state.error = null;
      })
      .addCase(
        getListUserPermissions.fulfilled,
        (state: Draft<UserState>, action: PayloadAction<GetListUserPermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.getListUserPermissions = false;
          state.error = null;
          state.listUserPermissions = data.list;
        }
      )
      .addCase(getListUserPermissions.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.getListUserPermissions = false;
        state.error = action.payload as string;
        state.listUserPermissions = [];
      });

    builder
      // Edit List User Permissions
      .addCase(editListUserPermissions.pending, (state: Draft<UserState>) => {
        state.loading.editListUserPermissions = true;
        state.error = null;
      })
      .addCase(editListUserPermissions.fulfilled, (state: Draft<UserState>) => {
        state.loading.editListUserPermissions = false;
        state.error = null;
      })
      .addCase(editListUserPermissions.rejected, (state: Draft<UserState>, action: PayloadAction<any>) => {
        state.loading.editListUserPermissions = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
