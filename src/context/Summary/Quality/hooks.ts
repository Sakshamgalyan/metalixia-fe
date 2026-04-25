import { useContext } from 'react';
import { QualityStateContext, QualityDispatchContext } from './index';

export const useQualityStateContext = () => {
  const ctx = useContext(QualityStateContext);
  if (!ctx)
    throw new Error(
      'useQualityStateContext must be wrapped in QualityContextProvider',
    );
  return { ...ctx.state };
};

export const useQualityDispatchContext = () => {
  const ctx = useContext(QualityDispatchContext);
  if (!ctx)
    throw new Error(
      'useQualityDispatchContext must be wrapped in QualityContextProvider',
    );
  return ctx.dispatch;
};
