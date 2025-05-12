import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateCustomerResponse,
  EditCustomerInfoResponse,
  GetListCustomerResponse,
  GetCustomerResponse,
  RemoveCustomerResponse,
  CustomerState,
} from "@/redux/customer/customer.type";
import {
  getListCustomer,
  createCustomer,
  getCustomer,
  editCustomerInfo,
  removeCustomer,
  exportListCustomerExcel,
} from "@/redux/customer/customer.thunk";

const initialState: CustomerState = {
  loading: {
    createCustomer: false,
    getListCustomer: false,
    getCustomer: false,
    editCustomer: false,
    removeCustomer: false,
    exportListCustomerExcel: false,
  },
  newItem: null,
  item: null,
  initializedList: false,
  list: [],
  totalCount: 0,
  error: null,
  removedCustomerIds: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CustomerState>) => {
    // Create Customer
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading.createCustomer = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action: PayloadAction<CreateCustomerResponse>) => {
        const { data } = action.payload;
        state.loading.createCustomer = false;
        state.error = null;
        state.newItem = data;
      })
      .addCase(createCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createCustomer = false;
        state.error = action.payload;
        state.newItem = null;
      });

    builder
      // Get List Customer
      .addCase(getListCustomer.pending, (state: Draft<CustomerState>) => {
        state.loading.getListCustomer = true;
        state.error = null;
      })
      .addCase(
        getListCustomer.fulfilled,
        (state: Draft<CustomerState>, action: PayloadAction<GetListCustomerResponse>) => {
          const { data } = action.payload;
          state.loading.getListCustomer = false;
          state.error = null;
          state.list = data.list;
          state.initializedList = true;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListCustomer.rejected, (state: Draft<CustomerState>, action: PayloadAction<any>) => {
        state.loading.getListCustomer = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
        state.initializedList = true;
      });

    builder
      // Export List Customer Excel
      .addCase(exportListCustomerExcel.pending, (state: Draft<CustomerState>) => {
        state.loading.exportListCustomerExcel = true;
        state.error = null;
      })
      .addCase(exportListCustomerExcel.fulfilled, (state: Draft<CustomerState>) => {
        state.loading.exportListCustomerExcel = false;
        state.error = null;
      })
      .addCase(exportListCustomerExcel.rejected, (state: Draft<CustomerState>, action: PayloadAction<any>) => {
        state.loading.exportListCustomerExcel = false;
        state.error = action.payload as string;
      });

    builder
      // Get Customer
      .addCase(getCustomer.pending, (state: Draft<CustomerState>) => {
        state.loading.getCustomer = true;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state: Draft<CustomerState>, action: PayloadAction<GetCustomerResponse>) => {
        const { data } = action.payload;
        state.loading.getCustomer = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getCustomer.rejected, (state: Draft<CustomerState>, action: PayloadAction<any>) => {
        state.loading.getCustomer = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit Customer Info
      .addCase(editCustomerInfo.pending, (state: Draft<CustomerState>) => {
        state.loading.editCustomer = true;
        state.error = null;
      })
      .addCase(
        editCustomerInfo.fulfilled,
        (state: Draft<CustomerState>, action: PayloadAction<EditCustomerInfoResponse>) => {
          const { data } = action.payload;
          state.loading.editCustomer = false;
          state.error = null;
          state.item = data;
          state.list = state.list.map((item) => (item.id === data.id ? data : item));
        }
      )
      .addCase(editCustomerInfo.rejected, (state: Draft<CustomerState>, action: PayloadAction<any>) => {
        state.loading.editCustomer = false;
        state.error = action.payload as string;
      });

    builder
      // Remove Customer
      .addCase(removeCustomer.pending, (state: Draft<CustomerState>) => {
        state.loading.removeCustomer = true;
        state.error = null;
      })
      .addCase(
        removeCustomer.fulfilled,
        (state: Draft<CustomerState>, action: PayloadAction<RemoveCustomerResponse>) => {
          const { data } = action.payload;
          state.loading.removeCustomer = false;
          state.error = null;
          state.removedCustomerIds.push(data.id);
        }
      )
      .addCase(removeCustomer.rejected, (state: Draft<CustomerState>, action: PayloadAction<any>) => {
        state.loading.removeCustomer = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
