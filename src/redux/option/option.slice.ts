import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { GetListOptionResponse, OptionState } from "@/redux/option/option.type";
import { getListOption } from "@/redux/option/option.thunk";

const initialState: OptionState = {
  loading: {
    getListOption: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OptionState>) => {
    builder
      // Get List Option
      .addCase(getListOption.pending, (state: Draft<OptionState>) => {
        state.loading.getListOption = true;
        state.error = null;
      })
      .addCase(getListOption.fulfilled, (state: Draft<OptionState>, action: PayloadAction<GetListOptionResponse>) => {
        const { data } = action.payload;
        state.loading.getListOption = false;
        state.error = null;
        state.list = data;
        state.totalCount = data.length;
      })
      .addCase(getListOption.rejected, (state: Draft<OptionState>, action: PayloadAction<any>) => {
        state.loading.getListOption = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });
  },
});

export default optionSlice.reducer;
