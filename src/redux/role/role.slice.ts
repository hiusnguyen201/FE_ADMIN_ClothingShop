import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateRoleResponse,
  EditListRolePermissionsResponse,
  EditRoleInfoResponse,
  GetListRolePermissionsResponse,
  GetListRoleResponse,
  GetRoleResponse,
  RemoveRoleResponse,
  RoleState,
} from "@/redux/role/role.type";
import {
  getListRole,
  createRole,
  getRole,
  editRoleInfo,
  removeRole,
  getListRolePermissions,
  editListRolePermissions,
} from "@/redux/role/role.thunk";

const initialState: RoleState = {
  loading: {
    createRole: false,
    getListRole: false,
    getRole: false,
    editRole: false,
    removeRole: false,
    getListRolePermissions: false,
    editListRolePermissions: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
  isInitialized: false,
  listRolePermissions: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RoleState>) => {
    // Create Role
    builder
      .addCase(createRole.pending, (state) => {
        state.loading.createRole = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<CreateRoleResponse>) => {
        const { data } = action.payload;
        state.loading.createRole = false;
        state.error = null;
        state.item = data;
      })
      .addCase(createRole.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createRole = false;
        state.error = action.payload;
        state.item = null;
      });

    builder
      // Get List Role
      .addCase(getListRole.pending, (state: Draft<RoleState>) => {
        state.loading.getListRole = true;
        state.error = null;
      })
      .addCase(getListRole.fulfilled, (state: Draft<RoleState>, action: PayloadAction<GetListRoleResponse>) => {
        const { data } = action.payload;
        state.loading.getListRole = false;
        state.error = null;
        state.list = data.list;
        state.totalCount = data.totalCount;
        state.isInitialized = true;
      })
      .addCase(getListRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getListRole = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
        state.isInitialized = true;
      });

    builder
      // Get Role
      .addCase(getRole.pending, (state: Draft<RoleState>) => {
        state.loading.getRole = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state: Draft<RoleState>, action: PayloadAction<GetRoleResponse>) => {
        const { data } = action.payload;
        state.loading.getRole = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getRole = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit Role Info
      .addCase(editRoleInfo.pending, (state: Draft<RoleState>) => {
        state.loading.editRole = true;
        state.error = null;
      })
      .addCase(editRoleInfo.fulfilled, (state: Draft<RoleState>, action: PayloadAction<EditRoleInfoResponse>) => {
        const { data } = action.payload;
        state.loading.editRole = false;
        state.error = null;
        state.item = data;
        state.list = state.list.map((item) => (item.id === data.id ? data : item));
      })
      .addCase(editRoleInfo.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.editRole = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Remove Role
      .addCase(removeRole.pending, (state: Draft<RoleState>) => {
        state.loading.removeRole = true;
        state.error = null;
      })
      .addCase(removeRole.fulfilled, (state: Draft<RoleState>, action: PayloadAction<RemoveRoleResponse>) => {
        const { data } = action.payload;
        state.loading.removeRole = false;
        state.error = null;
        state.list = state.list.filter((item) => item.id !== data.id);
      })
      .addCase(removeRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.removeRole = false;
        state.error = action.payload as string;
      });

    builder
      // Get List Role Permissions
      .addCase(getListRolePermissions.pending, (state: Draft<RoleState>) => {
        state.loading.getListRolePermissions = true;
        state.error = null;
      })
      .addCase(
        getListRolePermissions.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<GetListRolePermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.getListRolePermissions = false;
          state.error = null;
          state.listRolePermissions = data.list;
        }
      )
      .addCase(getListRolePermissions.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getListRolePermissions = false;
        state.error = action.payload as string;
        state.listRolePermissions = [];
      });

    builder
      // Edit List Role Permissions
      .addCase(editListRolePermissions.pending, (state: Draft<RoleState>) => {
        state.loading.editListRolePermissions = true;
        state.error = null;
      })
      .addCase(
        editListRolePermissions.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<EditListRolePermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.editListRolePermissions = false;
          state.error = null;
        }
      )
      .addCase(editListRolePermissions.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.editListRolePermissions = false;
        state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;
