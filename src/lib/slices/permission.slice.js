import { createSlice } from "@reduxjs/toolkit";
import * as permissionApi from "@/api/permission.api";

const initialState = {
  isLoading: false,
  error: null,
  item: null,
  list: [],
  deletedIds: [],
  meta: {},
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getAll: (state, action) => {
      state.list = action.payload.list;
      state.meta = action.payload.meta;
      state.isLoading = false;
      state.error = null;
    },
    getOne: (state, action) => {
      state.item = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    create: (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    update: (state, action) => {
      state.list = state.list.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
    },
    remove: (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload);
      state.deletedIds.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default permissionSlice.reducer;

export const {
  startLoading,
  hasError,
  getAll,
  getOne,
  create,
  update,
  remove,
} = permissionSlice.actions;

//get all
export const getAllPermissions =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await permissionApi.getAllPermissions(filters);
      dispatch(getAll(data.data));
    } catch (err) {
      dispatch(hasError(err?.response?.data || err));
    }
  };
