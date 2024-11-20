'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type CustomSessionProviderProps = {
  children: ReactNode;
  session?: Session | null;
};

export default function CustomSessionProvider({
  children,
  session,
}: CustomSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
