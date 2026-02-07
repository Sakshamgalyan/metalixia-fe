"use client";

import { createContext, useReducer, useContext } from "react";
import { EmailState, EmailAction } from "./types";
import { emailReducer, initialState } from "./reducer";

const EmailStateContext = createContext<EmailState>(initialState);
const EmailDispatchContext = createContext<React.Dispatch<EmailAction>>(
  () => null,
);

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  return (
    <EmailStateContext.Provider value={state}>
      <EmailDispatchContext.Provider value={dispatch}>
        {children}
      </EmailDispatchContext.Provider>
    </EmailStateContext.Provider>
  );
};

export const useEmailState = () => useContext(EmailStateContext);
export const useEmailDispatch = () => useContext(EmailDispatchContext);
