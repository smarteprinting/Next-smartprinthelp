'use client';

import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from '@/redux/store';
import { ImagePreloadProvider } from '@/lib/ImagePreloadContext';
import { useEffect, useState } from 'react';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <HelmetProvider>
        <ImagePreloadProvider>
          {children}
        </ImagePreloadProvider>
      </HelmetProvider>
    </Provider>
  );
}
