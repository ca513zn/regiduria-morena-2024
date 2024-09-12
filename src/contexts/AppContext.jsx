import React, { createContext, useContext, useState } from "react";
import { latest_proposals } from "../constants";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    proposals: latest_proposals,
    unread_notifications: latest_proposals.length,
  });
  const value = { ...state, setState };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
