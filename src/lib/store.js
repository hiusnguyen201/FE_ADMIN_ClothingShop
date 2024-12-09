import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "@/lib/slices/product.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
  });
};
