import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
