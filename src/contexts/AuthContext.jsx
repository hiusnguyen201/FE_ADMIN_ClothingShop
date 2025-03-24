import { createContext, useEffect, useReducer } from "react";
import { getAccessToken, isValidToken, setSession } from "@/utils/jwt";
import accountService from "@/redux/account/account.service";

const initialState = {
  isAuthenticated: true,
  isInitialized: true,
  error: null,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
};

export const AuthContext = createContext({ isAuthenticated: false, isInitialized: false, user: null });

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && isValidToken(accessToken)) {
        const { data } = await accountService.getProfile();
        const userInfo = data.data;
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: true, user: userInfo } });
      } else {
        setSession(null);
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null } });
      }
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null, error: message } });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
