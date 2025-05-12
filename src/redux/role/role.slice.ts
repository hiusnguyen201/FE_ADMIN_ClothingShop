import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  AddRolePermissionsResponse,
  CreateRoleResponse,
  EditRoleInfoResponse,
  GetListAssignedRolePermissionsResponse,
  GetListRoleResponse,
  GetListUnassignedRolePermissionsResponse,
  GetRoleResponse,
  RemoveRolePermissionResponse,
  RemoveRoleResponse,
  RoleState,
} from "@/redux/role/role.type";
import {
  getListRole,
  createRole,
  getRole,
  editRoleInfo,
  removeRole,
  getListAssignedRolePermissions,
  removeRolePermission,
  checkRoleNameExist,
  addRolePermissions,
  getListUnassignedRolePermissions,
  exportListRoleExcel,
} from "@/redux/role/role.thunk";

const initialState: RoleState = {
  loading: {
    checkRoleNameExist: false,
    createRole: false,
    getListRole: false,
    getRole: false,
    editRole: false,
    removeRole: false,
    getListAssignedRolePermissions: false,
    getListUnassignedRolePermissions: false,
    addRolePermissions: false,
    removeRolePermission: false,
    exportListRoleExcel: false,
  },
  newItem: null,
  item: null,
  initializedListRolePermission: false,
  initializedList: false,
  list: [],
  totalCount: 0,
  error: null,
  assignedRolePermissions: [],
  unassignedRolePermissions: [],
  removedRoleIds: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RoleState>) => {
    // Check Role Name
    builder
      .addCase(checkRoleNameExist.pending, (state) => {
        state.loading.checkRoleNameExist = true;
        state.error = null;
      })
      .addCase(checkRoleNameExist.fulfilled, (state) => {
        state.loading.checkRoleNameExist = false;
        state.error = null;
      })
      .addCase(checkRoleNameExist.rejected, (state, action: PayloadAction<any>) => {
        state.loading.checkRoleNameExist = false;
        state.error = action.payload;
      });

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
        state.newItem = data;
      })
      .addCase(createRole.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createRole = false;
        state.error = action.payload;
        state.newItem = null;
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
        state.initializedList = true;
      })
      .addCase(getListRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getListRole = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
        state.initializedList = true;
      });

    builder
      // Export List Role Excel
      .addCase(exportListRoleExcel.pending, (state: Draft<RoleState>) => {
        state.loading.exportListRoleExcel = true;
        state.error = null;
      })
      .addCase(exportListRoleExcel.fulfilled, (state: Draft<RoleState>) => {
        state.loading.exportListRoleExcel = false;
        state.error = null;
      })
      .addCase(exportListRoleExcel.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.exportListRoleExcel = false;
        state.error = action.payload as string;
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
        state.removedRoleIds.push(data.id);
      })
      .addCase(removeRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.removeRole = false;
        state.error = action.payload as string;
      });

    builder
      // Get List Assigned Role Permissions
      .addCase(getListAssignedRolePermissions.pending, (state: Draft<RoleState>) => {
        state.loading.getListAssignedRolePermissions = true;
        state.error = null;
      })
      .addCase(
        getListAssignedRolePermissions.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<GetListAssignedRolePermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.getListAssignedRolePermissions = false;
          state.error = null;
          state.assignedRolePermissions = data.list;
          state.initializedListRolePermission = true;
        }
      )
      .addCase(getListAssignedRolePermissions.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getListAssignedRolePermissions = false;
        state.error = action.payload as string;
        state.assignedRolePermissions = [];
        state.initializedListRolePermission = true;
      });

    builder
      // Get List Unassigned Role Permissions
      .addCase(getListUnassignedRolePermissions.pending, (state: Draft<RoleState>) => {
        state.loading.getListUnassignedRolePermissions = true;
        state.error = null;
      })
      .addCase(
        getListUnassignedRolePermissions.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<GetListUnassignedRolePermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.getListUnassignedRolePermissions = false;
          state.error = null;
          state.unassignedRolePermissions = data.list;
        }
      )
      .addCase(getListUnassignedRolePermissions.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.getListUnassignedRolePermissions = false;
        state.error = action.payload as string;
        state.unassignedRolePermissions = [];
      });

    builder
      // Add Role Permissions
      .addCase(addRolePermissions.pending, (state: Draft<RoleState>) => {
        state.loading.addRolePermissions = true;
        state.error = null;
      })
      .addCase(
        addRolePermissions.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<AddRolePermissionsResponse>) => {
          const { data } = action.payload;
          state.loading.addRolePermissions = false;
          state.assignedRolePermissions = [...data, ...state.assignedRolePermissions];
          state.unassignedRolePermissions = state.unassignedRolePermissions.filter(
            (item) => !data.map((permission) => permission.id).includes(item.id)
          );
          state.error = null;
        }
      )
      .addCase(addRolePermissions.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.addRolePermissions = false;
        state.error = action.payload as string;
      });

    builder
      // Remove Role Permission
      .addCase(removeRolePermission.pending, (state: Draft<RoleState>) => {
        state.loading.removeRolePermission = true;
        state.error = null;
      })
      .addCase(
        removeRolePermission.fulfilled,
        (state: Draft<RoleState>, action: PayloadAction<RemoveRolePermissionResponse>) => {
          const { data } = action.payload;
          state.loading.removeRolePermission = false;
          const removedPermission = state.assignedRolePermissions.find((item) => item.id === data.id);
          state.assignedRolePermissions = state.assignedRolePermissions.filter((item) => item.id !== data.id);
          if (removedPermission) {
            state.unassignedRolePermissions = [removedPermission, ...state.unassignedRolePermissions];
          }
          state.error = null;
        }
      )
      .addCase(removeRolePermission.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.loading.removeRolePermission = false;
        state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;
