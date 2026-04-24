import { useContext } from "react";
import { InventoryStateContext, InventoryDispatchContext } from "./index";

export const useInventoryStateContext = () => {
  const context = useContext(InventoryStateContext);
  if (!context) {
    throw new Error("useInventoryStateContext must be wrapped in InventoryContextProvider");
  }
  return { ...context.state };
};

export const useInventoryDispatchContext = () => {
  const ctx = useContext(InventoryDispatchContext);
  if (!ctx) {
    throw new Error("useInventoryDispatchContext must be wrapped in InventoryContextProvider");
  }
  return ctx.dispatch;
};
