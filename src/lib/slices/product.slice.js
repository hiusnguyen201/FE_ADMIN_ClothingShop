import { createSlice } from "@reduxjs/toolkit";
import * as productApi from "@/api/product.api";

const initialState = {
  isLoading: false,
  error: null,
  item: null,
  list: [],
  deletedIds: [],
};

const productSlice = createSlice({
  name: "product",
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
      state.list = action.payload;
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

export default productSlice.reducer;

export const {
  startLoading,
  hasError,
  getAll,
  getOne,
  create,
  update,
  remove,
} = productSlice.actions;

export const getAllProducts =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await productApi.getAllProducts(filters);
      dispatch(getAll(data || []));
    } catch (err) {
      dispatch(hasError(e?.response?.data || e));
    }
  };
