import { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { getAccessToken, isValidToken, setSession } from "@/utils/jwt";
import { User } from "@/types/user";
import { getProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import { LoginPayload, LoginResponse } from "@/redux/auth/auth.type";
import { login } from "@/redux/auth/auth.thunk";
import { Nullable } from "@/types/common";

type State = {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  error?: Nullable<string>;
  user?: Nullable<User>;
  reInitialize?: () => Promise<void>;
  logout?: () => Promise<void>;
  login?: (values: LoginPayload) => Promise<void>;
};

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  error: null,
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reInitialize: () => Promise.resolve(),
};

type ActionType = "INITIALIZE" | "LOGOUT" | "LOGIN" | "CLEAR" | "ERROR";

type AuthAction = {
  type: ActionType;
  payload?: State;
};

const handlers: Record<ActionType, (state: State, action: AuthAction) => State> = {
  INITIALIZE: (state: State, action: AuthAction) => {
    if (!action?.payload) return { ...state, isInitialized: true };
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
  LOGIN: (state: State, action: AuthAction) => {
    if (!action?.payload) return state;
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      isInitialized: true,
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
      user: null,
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
      dispatch({ type: "CLEAR" });
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
      // const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null } });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const loginAction = async (values: LoginPayload) => {
    try {
      dispatch({ type: "CLEAR" });
      const response: LoginResponse = await appDispatch(login(values)).unwrap();
      const { user, tokens } = response.data;
      dispatch({ type: "LOGIN", payload: { user } });
      setSession(tokens.accessToken, tokens.refreshToken);
      toast({ title: "Login successful" });
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
      dispatch({ type: "ERROR", payload: { error: message } });
    }
  };

  const logoutAction = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    toast({ title: "Logout successful" });
  };

  return (
    <AuthContext.Provider value={{ ...state, reInitialize: initialize, logout: logoutAction, login: loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};
