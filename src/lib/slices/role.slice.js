import { createSlice } from "@reduxjs/toolkit";
import * as roleApi from "@/api/role.api";

const initialState = {
  isLoading: false,
  error: null,
  item: null,
  list: [],
  deletedIds: [],
  meta: {},
};

const roleSlice = createSlice({
  name: "role",
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
      state.list = action.payload.data;
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
      state.list = state.list.filter((item) => item._id !== action.payload._id);
    },
  },
});

export default roleSlice.reducer;

export const {
  startLoading,
  hasError,
  getAll,
  getOne,
  create,
  update,
  remove,
} = roleSlice.actions;

//get all
export const getAllRoles =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await roleApi.getAllRoles(filters);

      dispatch(getAll(data || []));
    } catch (err) {
      dispatch(hasError(err?.response?.data || err));
    }
  };

//edit
export const getOneRoles =
  (id) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await roleApi.getOneRoles(id);
      dispatch(getOne(data));
    } catch (err) {
      dispatch(hasError(err?.response?.data || err));
    }
  };

export const postUpdateRoles =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await roleApi.updateRole(filters);
      dispatch(update(data));
    } catch (err) {
      dispatch(hasError(err?.response?.data || err));
    }
  };
