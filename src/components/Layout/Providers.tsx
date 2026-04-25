'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import CustomToaster from '@/components/UI/Toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <CustomToaster />
    </Provider>
  );
}
