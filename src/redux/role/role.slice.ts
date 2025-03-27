import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateRoleResponse,
  EditRoleInfoResponse,
  GetListRoleResponse,
  GetRoleResponse,
  RemoveRoleResponse,
  RoleState,
} from "@/redux/role/role.type";
import { getListRole, createRole, getRole, editRoleInfo, removeRole } from "@/redux/role/role.thunk";

const initialState: RoleState = {
  loading: {
    createRole: false,
    getListRole: false,
    getRole: false,
    editRole: false,
    removeRole: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
  isInitialized: false,
};

const roleSlice = createSlice({
  name: "account",
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
  },
});

export default roleSlice.reducer;
