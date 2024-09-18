import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { latest_proposals } from "../constants";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    proposals: latest_proposals,
    unread_notifications: latest_proposals.length,
    auth: {
      user: null,
    },
  });

  const isAdmin = useMemo(() => state.auth.user?.admin, [state.auth.user]);

  const setAuth = useCallback((user) => {
    setState({ ...state, auth: { user } });
  }, []);

  const value = { ...state, setState, setAuth, isAdmin };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
