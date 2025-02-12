import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/slices/product.slice";
import roleReducer from "@/lib/slices/role.slice";
import permissionReducer from "@/lib/slices/permission.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      role: roleReducer,
      permission: permissionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
