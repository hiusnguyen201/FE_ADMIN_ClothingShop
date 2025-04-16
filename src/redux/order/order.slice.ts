import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateOrderResponse,
  EditOrderInfoResponse,
  GetListOrderResponse,
  GetOrderResponse,
  RemoveOrderResponse,
  OrderState,
} from "@/redux/order/order.type";
import { getListOrder, createOrder, getOrder, editOrderInfo, removeOrder } from "@/redux/order/order.thunk";

const initialState: OrderState = {
  loading: {
    createOrder: false,
    getListOrder: false,
    getOrder: false,
    editOrder: false,
    removeOrder: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading.createOrder = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
        const { data } = action.payload;
        state.loading.createOrder = false;
        state.error = null;
        state.item = data;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createOrder = false;
        state.error = action.payload;
        state.item = null;
      });

    builder
      // Get List Order
      .addCase(getListOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getListOrder = true;
        state.error = null;
      })
      .addCase(getListOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetListOrderResponse>) => {
        const { data } = action.payload;
        state.loading.getListOrder = false;
        state.error = null;
        state.list = data.list;
        state.totalCount = data.totalCount;
      })
      .addCase(getListOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getListOrder = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });

    builder
      // Get Order
      .addCase(getOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getOrder = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetOrderResponse>) => {
        const { data } = action.payload;
        state.loading.getOrder = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getOrder = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit Order Info
      .addCase(editOrderInfo.pending, (state: Draft<OrderState>) => {
        state.loading.editOrder = true;
        state.error = null;
      })
      .addCase(editOrderInfo.fulfilled, (state: Draft<OrderState>, action: PayloadAction<EditOrderInfoResponse>) => {
        const { data } = action.payload;
        state.loading.editOrder = false;
        state.error = null;
        state.item = data;
        state.list = state.list.map((item) => (item.id === data.id ? data : item));
      })
      .addCase(editOrderInfo.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.editOrder = false;
        state.error = action.payload as string;
      });

    builder
      // Remove Order
      .addCase(removeOrder.pending, (state: Draft<OrderState>) => {
        state.loading.removeOrder = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<RemoveOrderResponse>) => {
        const { data } = action.payload;
        state.loading.removeOrder = false;
        state.error = null;
        state.list = state.list.filter((item) => item.id !== data.id);
      })
      .addCase(removeOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.removeOrder = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
