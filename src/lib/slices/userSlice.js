

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from "@/api/user.api";

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id) => {
    try {
      const { data } = await userApi.getUserById(id);
      return data;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }) => {
    try {
      const { data } = await userApi.updateUser(id, formData);
      return data;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (filters = {}) => {
    try {
      const { data } = await userApi.getAllUsers(filters);
      return data || [];
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (formData) => {
    try {
      const { data } = await userApi.createUser(formData);
      return data;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const initialState = {
  listUsers: null,
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // GetAllUsers cases
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listUsers = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // UpdateUser cases
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
       
        if (state.listUsers?.data?.list) {
          const index = state.listUsers.data.list.findIndex(
            user => user._id === action.payload.data._id
          );
          if (index !== -1) {
            state.listUsers.data.list[index] = action.payload.data;
          }
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.listUsers.data.list = state.listUsers.data.list.filter(
          user => user._id !== action.payload
        );
      })

      // createUser
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
      
        if (state.listUsers?.data?.list) {
          state.listUsers.data.list.unshift(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
  })
  },
});

export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;