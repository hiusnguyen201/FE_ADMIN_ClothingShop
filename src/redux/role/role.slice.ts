import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreateRoleResponse, GetListRoleResponse, RoleState } from "@/redux/role/role.type";
import { getListRole, createRole } from "@/redux/role/role.thunk";

const initialState: RoleState = {
  item: null,
  list: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  isInitialized: false,
};

const roleSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RoleState>) => {
    builder
      // Get List Role
      .addCase(getListRole.pending, (state: Draft<RoleState>) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListRole.fulfilled, (state: Draft<RoleState>, action: PayloadAction<GetListRoleResponse>) => {
        const { data } = action.payload;
        state.isLoading = false;
        state.error = null;
        state.list = data.list;
        state.totalCount = data.totalCount;
        state.isInitialized = true;
      })
      .addCase(getListRole.rejected, (state: Draft<RoleState>, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
        state.isInitialized = true;
      });

    // Create Role
    builder
      .addCase(createRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action: PayloadAction<CreateRoleResponse>) => {
        const { data } = action.payload;
        state.isLoading = false;
        state.error = null;
        state.item = data;
      })
      .addCase(createRole.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.item = null;
      });
  },
});

export default roleSlice.reducer;
