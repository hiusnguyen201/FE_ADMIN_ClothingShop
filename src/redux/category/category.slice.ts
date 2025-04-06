import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { GetListCategoryResponse, CategoryState, CreateCategoryResponse } from "@/redux/category/category.type";
import { checkCategoryNameExist, createCategory, getListCategory } from "@/redux/category/category.thunk";

const initialState: CategoryState = {
  loading: {
    getListCategory: false,
    createCategory: false,
    checkCategoryNameExist: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
};

const roleSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder
      // Get List Category
      .addCase(getListCategory.pending, (state: Draft<CategoryState>) => {
        state.loading.getListCategory = true;
        state.error = null;
      })
      .addCase(
        getListCategory.fulfilled,
        (state: Draft<CategoryState>, action: PayloadAction<GetListCategoryResponse>) => {
          const { data } = action.payload;
          state.loading.getListCategory = false;
          state.error = null;
          state.list = data.list;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListCategory.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.getListCategory = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });

    // Create Category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading.createCategory = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<CreateCategoryResponse>) => {
        const { data } = action.payload;
        state.loading.createCategory = false;
        state.error = null;
        state.item = data;
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createCategory = false;
        state.error = action.payload;
        state.item = null;
      });

    // Check Category Name
    builder
      .addCase(checkCategoryNameExist.pending, (state) => {
        state.loading.checkCategoryNameExist = true;
        state.error = null;
      })
      .addCase(checkCategoryNameExist.fulfilled, (state) => {
        state.loading.checkCategoryNameExist = false;
        state.error = null;
      })
      .addCase(checkCategoryNameExist.rejected, (state, action: PayloadAction<any>) => {
        state.loading.checkCategoryNameExist = false;
        state.error = action.payload;
      });
  },
});

export default roleSlice.reducer;
