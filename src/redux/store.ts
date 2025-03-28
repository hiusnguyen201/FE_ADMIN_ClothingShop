import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import accountReducer from "./account/account.slice";
import roleReducer from "./role/role.slice";
import permissionReducer from "./permission/permission.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    role: roleReducer,
    permission: permissionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
