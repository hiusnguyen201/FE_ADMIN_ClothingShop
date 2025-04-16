import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  DivisionState,
  GetListDistrictResponse,
  GetListProvinceResponse,
  GetListWardResponse,
} from "@/redux/division/division.type";
import { getListDistrict, getListProvince, getListWard } from "@/redux/division/division.thunk";

const initialState: DivisionState = {
  loading: {
    getListProvince: false,
    getListDistrict: false,
    getListWard: false,
  },
  list: {
    provinces: [],
    districts: [],
    wards: [],
  },
  error: null,
};

const orderSlice = createSlice({
  name: "division",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DivisionState>) => {
    builder
      // Get List Province
      .addCase(getListProvince.pending, (state: Draft<DivisionState>) => {
        state.loading.getListProvince = true;
        state.error = null;
      })
      .addCase(
        getListProvince.fulfilled,
        (state: Draft<DivisionState>, action: PayloadAction<GetListProvinceResponse>) => {
          const { data } = action.payload;
          state.loading.getListProvince = false;
          state.error = null;
          state.list.provinces = data.list;
        }
      )
      .addCase(getListProvince.rejected, (state: Draft<DivisionState>, action: PayloadAction<any>) => {
        state.loading.getListProvince = false;
        state.error = action.payload as string;
        state.list.provinces = [];
      });

    builder
      // Get List District
      .addCase(getListDistrict.pending, (state: Draft<DivisionState>) => {
        state.loading.getListDistrict = true;
        state.error = null;
      })
      .addCase(
        getListDistrict.fulfilled,
        (state: Draft<DivisionState>, action: PayloadAction<GetListDistrictResponse>) => {
          const { data } = action.payload;
          state.loading.getListDistrict = false;
          state.error = null;
          state.list.districts = data.list;
        }
      )
      .addCase(getListDistrict.rejected, (state: Draft<DivisionState>, action: PayloadAction<any>) => {
        state.loading.getListDistrict = false;
        state.error = action.payload as string;
        state.list.districts = [];
      });

    builder
      // Get List Ward
      .addCase(getListWard.pending, (state: Draft<DivisionState>) => {
        state.loading.getListWard = true;
        state.error = null;
      })
      .addCase(getListWard.fulfilled, (state: Draft<DivisionState>, action: PayloadAction<GetListWardResponse>) => {
        const { data } = action.payload;
        state.loading.getListWard = false;
        state.error = null;
        state.list.wards = data.list;
      })
      .addCase(getListWard.rejected, (state: Draft<DivisionState>, action: PayloadAction<any>) => {
        state.loading.getListWard = false;
        state.error = action.payload as string;
        state.list.wards = [];
      });
  },
});

export default orderSlice.reducer;
