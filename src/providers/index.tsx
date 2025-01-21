'use client';
import type * as React from 'react';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryClientProvider>{children}</ReactQueryClientProvider>;
}
