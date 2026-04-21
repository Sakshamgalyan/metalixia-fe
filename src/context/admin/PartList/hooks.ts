import { useContext } from "react";
import { PartStateContext, PartDispatchContext } from "./index";

export const usePartStateContext = () => {
  const context = useContext(PartStateContext);
  if (!context) throw new Error("usePartStateContext must be used within PartContextProvider");
  return context;
};

export const usePartDispatchContext = () => {
  const context = useContext(PartDispatchContext);
  if (!context) throw new Error("usePartDispatchContext must be used within PartContextProvider");
  return context;
};
