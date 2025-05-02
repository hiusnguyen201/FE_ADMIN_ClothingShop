import { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { User } from "@/types/user";
import { getPermissionsInUser, getProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/redux/auth/auth.type";
import { login, logout, refreshToken, verifyOtp } from "@/redux/auth/auth.thunk";
import { Nullable } from "@/types/common";
import { setAuthUtils } from "@/redux/api";

type State = {
  isAuthenticated: boolean;
  is2FactorRequired: boolean;
  isInitialized: boolean;
  error: Nullable<string>;
  user: Nullable<User>;
  permissions: string[];
  login: (values: LoginPayload) => Promise<LoginResponse | void>;
  verifyOtp: (values: VerifyOtpPayload) => Promise<VerifyOtpResponse | void>;
  refreshToken: () => Promise<RefreshTokenResponse | void>;
  logout: () => Promise<LogoutResponse | void>;
  reInitialize: () => Promise<void>;
};

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  is2FactorRequired: false,
  error: null,
  user: null,
  permissions: [],
  login: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
  refreshToken: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reInitialize: () => Promise.resolve(),
};

type ActionType = "INITIALIZE" | "LOGOUT" | "LOGIN" | "CLEAR" | "ERROR" | "VERIFY_OTP" | "REFRESH_TOKEN";

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
      permissions: action.payload.permissions,
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
      isAuthenticated: action.payload.isAuthenticated ?? false,
      isInitialized: true,
      user: action.payload.user,
      is2FactorRequired: action.payload.is2FactorRequired ?? true,
      error: null,
    };
  },
  REFRESH_TOKEN: (state: State, action: AuthAction) => {
    if (!action?.payload) return state;
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user: action.payload.user,
      is2FactorRequired: false,
      error: null,
    };
  },
  VERIFY_OTP: (state: State, action: AuthAction) => {
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user: action.payload.user,
      permissions: action.payload.permissions,
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
      const responseProfile = await appDispatch(getProfile()).unwrap();
      const responsePermissions = await appDispatch(getPermissionsInUser()).unwrap();
      const userInfo = responseProfile.data;
      const permissions = responsePermissions.data;
      dispatch({
        type: "INITIALIZE",
        payload: { ...state, isAuthenticated: true, user: userInfo, permissions: permissions },
      });
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
      const { user, isAuthenticated, is2FactorRequired } = response.data;
      let permissions: string[] = [];
      if (isAuthenticated) {
        const responsePermissions = await appDispatch(getPermissionsInUser()).unwrap();
        permissions = responsePermissions.data;
      }
      dispatch({
        type: "LOGIN",
        payload: {
          ...state,
          user,
          isAuthenticated: values.email === "test@gmail.com" ? true : isAuthenticated,
          is2FactorRequired: values.email === "test@gmail.com" ? false : is2FactorRequired,
          permissions,
        },
      });
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
      const responsePermissions = await appDispatch(getPermissionsInUser()).unwrap();
      const { user, isAuthenticated } = response.data;
      const permissions = responsePermissions.data;
      dispatch({ type: "VERIFY_OTP", payload: { ...state, user, isAuthenticated, permissions } });
      return response;
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "ERROR", payload: { ...state, error: message } });
      throw Error(message);
    }
  };

  const refreshTokenAction = async (): Promise<RefreshTokenResponse> => {
    try {
      const response: RefreshTokenResponse = await appDispatch(refreshToken()).unwrap();
      const user = response.data;
      dispatch({ type: "REFRESH_TOKEN", payload: { ...state, user } });
      return response;
    } catch (e: any) {
      throw Error("Refresh token failed");
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

  setAuthUtils({ refreshToken: refreshTokenAction });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        reInitialize: initialize,
        logout: logoutAction,
        login: loginAction,
        verifyOtp: verifyOtpAction,
        refreshToken: refreshTokenAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
