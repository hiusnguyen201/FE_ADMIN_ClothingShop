import { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { getAccessToken, isValidToken, setSession } from "@/utils/jwt";
import { User } from "@/types/user";
import { PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";

type State = {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  error?: string | null;
  user?: User | null;
};

const initialState: State = {
  isAuthenticated: true,
  isInitialized: true,
  error: null,
  user: null,
};

type ActionType = "INITIALIZE";

const handlers: Record<ActionType, (state: State, action: PayloadAction<State>) => State> = {
  INITIALIZE: (state: State, action: PayloadAction<State>) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
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
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null, error: message } });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
