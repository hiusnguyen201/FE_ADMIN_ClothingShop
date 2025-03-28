import { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { getAccessToken, isValidToken, setSession } from "@/utils/jwt";
import { User } from "@/types/user";
import { PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import { LoginPayload, LoginResponse } from "@/redux/auth/auth.type";
import { login } from "@/redux/auth/auth.thunk";

type State = {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  error?: string | null;
  user?: User | null;
  reInitialize?: () => Promise<void>;
  logout?: () => Promise<void>;
  login?: (values: LoginPayload) => Promise<void>;
};

const initialState: State = {
  isAuthenticated: true,
  isInitialized: true,
  error: null,
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reInitialize: () => Promise.resolve(),
};

type ActionType = "INITIALIZE" | "LOGOUT" | "LOGIN";

const handlers: Record<ActionType, (state: State, action?: PayloadAction<State>) => State> = {
  INITIALIZE: (state: State, action?: PayloadAction<State>) => {
    if (!action?.payload) return state;
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGOUT: (state: State) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  LOGIN: (state: State, action?: PayloadAction<State>) => {
    if (!action?.payload) return state;
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  },
};

const reducer = (state: State, action: PayloadAction<State> & { type: ActionType }) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<State>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && isValidToken(accessToken)) {
        const response = await appDispatch(getProfile()).unwrap();
        const userInfo = response.data;
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: true, user: userInfo } });
      } else {
        setSession(null);
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null } });
      }
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null, error: message } });
    }
  };

  const logoutAction = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT", payload: { isAuthenticated: false } });
    toast({ title: "Logout successful" });
  };

  const loginAction = async (values: LoginPayload) => {
    try {
      const response: LoginResponse = await appDispatch(login(values)).unwrap();
      const { user, tokens } = response.data;
      dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user } });
      setSession(tokens.accessToken, tokens.refreshToken);
      toast({ title: "Login successful" });
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "LOGIN", payload: { isAuthenticated: false, user: null, error: message } });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, reInitialize: initialize, logout: logoutAction, login: loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};
