import { createSlice } from "@reduxjs/toolkit";
import * as roleApi from "@/api/role.api";

const initialState = {
  isLoading: true,
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
      dispatch(getAll(data.data));
    } catch (err) {
      dispatch(hasError(err?.response?.data || err));
    }
  };

//edit
export const getOneRoleById = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await roleApi.getOneRoleById(id);
    dispatch(getOne(data));
  } catch (err) {
    dispatch(hasError(err?.response?.data || err));
  }
};

export const updateRoleById = (id, updatedData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await roleApi.updateRoleById(id, updatedData);
    dispatch(update(data));
  } catch (err) {
    dispatch(hasError(err?.response?.data || err));
  }
};

export const checkRoleName = (name) => async (dispatch) => {
  try {
    const { data } = await roleApi.checkRoleName(name);
    return data; 
  } catch (err) {
    dispatch(hasError(err?.response?.data || err));
  }
};


//create
export const createRole = (createData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await roleApi.createRole(createData);
    dispatch(create(data));
  } catch (err) {
    dispatch(hasError(err?.response?.data || err));
  }
};
