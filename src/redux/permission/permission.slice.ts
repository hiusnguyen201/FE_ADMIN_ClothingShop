import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { GetListPermissionResponse, PermissionState } from "@/redux/permission/permission.type";
import { getListPermission } from "@/redux/permission/permission.thunk";

const initialState: PermissionState = {
  loading: {
    getListPermission: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
};

const roleSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PermissionState>) => {
    builder
      // Get List Permission
      .addCase(getListPermission.pending, (state: Draft<PermissionState>) => {
        state.loading.getListPermission = true;
        state.error = null;
      })
      .addCase(
        getListPermission.fulfilled,
        (state: Draft<PermissionState>, action: PayloadAction<GetListPermissionResponse>) => {
          const { data } = action.payload;
          state.loading.getListPermission = false;
          state.error = null;
          state.list = data.list;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListPermission.rejected, (state: Draft<PermissionState>, action: PayloadAction<any>) => {
        state.loading.getListPermission = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });
  },
});

export default roleSlice.reducer;
