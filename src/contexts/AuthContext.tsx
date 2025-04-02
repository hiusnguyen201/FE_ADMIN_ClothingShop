import { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { User } from "@/types/user";
import { getProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/redux/auth/auth.type";
import { login, logout, sendOtpViaEmail, verifyOtp } from "@/redux/auth/auth.thunk";
import { Nullable } from "@/types/common";

type State = {
  isAuthenticated: boolean;
  is2FactorRequired: boolean;
  isInitialized: boolean;
  error: Nullable<string>;
  user: Nullable<User>;
  login: (values: LoginPayload) => Promise<LoginResponse | void>;
  verifyOtp: (values: VerifyOtpPayload) => Promise<VerifyOtpResponse | void>;
  logout: () => Promise<LogoutResponse | void>;
  reInitialize: () => Promise<void>;
};

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  is2FactorRequired: false,
  error: null,
  user: null,
  login: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reInitialize: () => Promise.resolve(),
};

type ActionType = "INITIALIZE" | "LOGOUT" | "LOGIN" | "CLEAR" | "ERROR" | "VERIFY_OTP";

type AuthAction = {
  type: ActionType;
  payload: State;
};

const handlers: Record<ActionType, (state: State, action: AuthAction) => State> = {
  INITIALIZE: (state: State, action: AuthAction) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      error: null,
      user,
    };
  },
  LOGOUT: (state: State) => {
    return {
      ...state,
      isAuthenticated: false,
      isInitialized: true,
      user: null,
      error: null,
    };
  },
  LOGIN: (state: State, action: AuthAction) => {
    if (!action?.payload) return state;
    return {
      ...state,
      isAuthenticated: false,
      isInitialized: true,
      user: action.payload.user,
      is2FactorRequired: true,
      error: null,
    };
  },
  VERIFY_OTP: (state: State, action: AuthAction) => {
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user: action.payload.user,
      is2FactorRequired: false,
      error: null,
    };
  },
  CLEAR: (state: State) => {
    return {
      ...state,
      isAuthenticated: false,
      isInitialized: false,
      user: null,
      error: null,
    };
  },
  ERROR: (state: State, action: AuthAction) => {
    if (!action?.payload) return state;
    const { error } = action.payload;
    return {
      ...state,
      isInitialized: true,
      isAuthenticated: false,
      error,
    };
  },
};

const reducer = (state: State, action: AuthAction & { type: ActionType }) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<State>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const response = await appDispatch(getProfile()).unwrap();
      const userInfo = response.data;
      dispatch({ type: "INITIALIZE", payload: { ...state, isAuthenticated: true, user: userInfo } });
    } catch (e: any) {
      // const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "INITIALIZE", payload: { ...state, isAuthenticated: false, user: null } });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const loginAction = async (values: LoginPayload): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await appDispatch(login(values)).unwrap();
      const { user, isAuthenticated } = response.data;
      dispatch({ type: "LOGIN", payload: { ...state, user, isAuthenticated } });
      return response;
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "ERROR", payload: { ...state, error: message } });
      throw Error(message);
    }
  };

  const verifyOtpAction = async (values: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    try {
      const response: VerifyOtpResponse = await appDispatch(verifyOtp(values)).unwrap();
      const { user, isAuthenticated } = response.data;
      dispatch({ type: "VERIFY_OTP", payload: { ...state, user, isAuthenticated } });
      return response;
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "ERROR", payload: { ...state, error: message } });
      throw Error(message);
    }
  };

  const logoutAction = async (): Promise<LogoutResponse> => {
    try {
      const response = await appDispatch(logout()).unwrap();
      dispatch({ type: "LOGOUT", payload: state });
      return response;
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "ERROR", payload: { ...state, error: message } });
      throw Error(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        reInitialize: initialize,
        logout: logoutAction,
        login: loginAction,
        verifyOtp: verifyOtpAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
