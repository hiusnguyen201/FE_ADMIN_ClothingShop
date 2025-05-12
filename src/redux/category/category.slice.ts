import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  GetListCategoryResponse,
  CategoryState,
  CreateCategoryResponse,
  RemoveCategoryResponse,
  EditCategoryInfoResponse,
  GetCategoryResponse,
  GetListSubcategoryResponse,
} from "@/redux/category/category.type";
import {
  checkCategoryNameExist,
  createCategory,
  editCategoryInfo,
  exportListCategoryExcel,
  getCategory,
  getListCategory,
  getListSubcategory,
  removeCategory,
} from "@/redux/category/category.thunk";

const initialState: CategoryState = {
  loading: {
    createCategory: false,
    checkCategoryNameExist: false,
    getListCategory: false,
    getCategory: false,
    editCategory: false,
    removeCategory: false,
    getListSubcategory: false,
    exportListCategoryExcel: false,
  },
  newItem: null,
  item: null,
  initializedList: false,
  initializedSubList: false,
  list: [],
  listSub: [],
  totalCount: 0,
  error: null,
  removedCategoryIds: [],
};

const roleSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
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
        state.newItem = data;
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createCategory = false;
        state.error = action.payload;
        state.newItem = null;
      });

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
          state.initializedList = true;
          state.error = null;
          state.list = data.list;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListCategory.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.getListCategory = false;
        state.error = action.payload as string;
        state.list = [];
        state.initializedList = true;
        state.totalCount = 0;
      });

    builder
      // Export List Category Excel
      .addCase(exportListCategoryExcel.pending, (state: Draft<CategoryState>) => {
        state.loading.exportListCategoryExcel = true;
        state.error = null;
      })
      .addCase(exportListCategoryExcel.fulfilled, (state: Draft<CategoryState>) => {
        state.loading.exportListCategoryExcel = false;
        state.error = null;
      })
      .addCase(exportListCategoryExcel.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.exportListCategoryExcel = false;
        state.error = action.payload as string;
      });

    builder
      // Get Category
      .addCase(getCategory.pending, (state: Draft<CategoryState>) => {
        state.loading.getCategory = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state: Draft<CategoryState>, action: PayloadAction<GetCategoryResponse>) => {
        const { data } = action.payload;
        state.loading.getCategory = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getCategory.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.getCategory = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit Category Info
      .addCase(editCategoryInfo.pending, (state: Draft<CategoryState>) => {
        state.loading.editCategory = true;
        state.error = null;
      })
      .addCase(
        editCategoryInfo.fulfilled,
        (state: Draft<CategoryState>, action: PayloadAction<EditCategoryInfoResponse>) => {
          const { data } = action.payload;
          state.loading.editCategory = false;
          state.error = null;
          state.item = data;
          state.list = state.list.map((item) => (item.id === data.id ? data : item));
        }
      )
      .addCase(editCategoryInfo.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.editCategory = false;
        state.error = action.payload as string;
      });

    builder
      // Remove Category
      .addCase(removeCategory.pending, (state: Draft<CategoryState>) => {
        state.loading.removeCategory = true;
        state.error = null;
      })
      .addCase(
        removeCategory.fulfilled,
        (state: Draft<CategoryState>, action: PayloadAction<RemoveCategoryResponse>) => {
          const { data } = action.payload;
          state.loading.removeCategory = false;
          state.error = null;
          state.removedCategoryIds.push(data.id);
        }
      )
      .addCase(removeCategory.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.removeCategory = false;
        state.error = action.payload as string;
      });

    builder
      // Get List Subcategory
      .addCase(getListSubcategory.pending, (state: Draft<CategoryState>) => {
        state.loading.getListSubcategory = true;
        state.error = null;
      })
      .addCase(
        getListSubcategory.fulfilled,
        (state: Draft<CategoryState>, action: PayloadAction<GetListSubcategoryResponse>) => {
          const { data } = action.payload;
          state.loading.getListSubcategory = false;
          state.error = null;
          state.listSub = data.list;
          state.initializedSubList = true;
        }
      )
      .addCase(getListSubcategory.rejected, (state: Draft<CategoryState>, action: PayloadAction<any>) => {
        state.loading.getListSubcategory = false;
        state.error = action.payload as string;
        state.listSub = [];
        state.initializedSubList = true;
      });
  },
});

export default roleSlice.reducer;
