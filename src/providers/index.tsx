'use client';
import type * as React from 'react';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { ToastContainer } from 'react-toastify';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      {children}
      <ToastContainer />
    </ReactQueryClientProvider>
  );
}
