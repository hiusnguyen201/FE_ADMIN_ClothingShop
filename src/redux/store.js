import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import accountReducer from "./account/account.slice";
import roleReducer from "./role/role.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    role: roleReducer,
  },
});
