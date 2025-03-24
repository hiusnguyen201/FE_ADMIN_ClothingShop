import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleService from "./role.service";

const roleSlice = createSlice({
  name: "account",
  initialState: {
    item: null,
    list: [],
    meta: null,
    isLoading: false,
    error: null,
    isInitialized: false,
  },
  extraReducers: (builder) => {
    builder
      // Get List Role
      .addCase(getListRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.list = action.payload.list;
        state.meta = action.payload.meta;
        state.isInitialized = true;
      })
      .addCase(getListRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.user = null;
      });

    // Create Role
    builder
      .addCase(createRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.item = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.item = null;
      });
  },
});

export default roleSlice.reducer;

export const createRole = createAsyncThunk("role/create-role", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await roleService.createRole(payload);
    return data;
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const getListRole = createAsyncThunk("role/get-roles", async (filters, { rejectWithValue }) => {
  try {
    const { data } = await roleService.getListRole(filters);
    return data.data;
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    return rejectWithValue(message);
  }
});
