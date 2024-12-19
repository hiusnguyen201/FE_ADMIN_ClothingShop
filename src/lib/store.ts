import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/slices/product.slice";
import roleReducer from "@/lib/slices/role.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      role: roleReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
