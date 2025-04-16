import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import accountReducer from "./account/account.slice";
import roleReducer from "./role/role.slice";
import orderReducer from "./order/order.slice";
import permissionReducer from "./permission/permission.slice";
import userReducer from "./user/user.slice";
import customerReducer from "./customer/customer.slice";
import categoryReducer from "./category/category.slice";
import productReducer from "./product/product.slice";
import optionReducer from "./option/option.slice";
import divisionReducer from "./division/division.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    user: userReducer,
    customer: customerReducer,
    division: divisionReducer,
    role: roleReducer,
    order: orderReducer,
    permission: permissionReducer,
    category: categoryReducer,
    product: productReducer,
    option: optionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
