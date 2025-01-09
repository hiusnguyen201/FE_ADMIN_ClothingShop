import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/slices/product.slice";
import authReducer from "@/lib/slices/auth.slice";
import { thunk } from "redux-thunk";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       product: productReducer,
//       auth: authReducer,
//     },
//   });
// };

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
