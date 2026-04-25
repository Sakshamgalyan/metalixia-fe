import { useContext } from 'react';
import { ProductionStateContext, ProductionDispatchContext } from './index';

export const useProductionStateContext = () => {
  const ctx = useContext(ProductionStateContext);
  if (!ctx)
    throw new Error(
      'useProductionStateContext must be wrapped in ProductionContextProvider',
    );
  return { ...ctx.state };
};

export const useProductionDispatchContext = () => {
  const ctx = useContext(ProductionDispatchContext);
  if (!ctx)
    throw new Error(
      'useProductionDispatchContext must be wrapped in ProductionContextProvider',
    );
  return ctx.dispatch;
};
