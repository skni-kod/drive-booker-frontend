'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
        LOGOUT
      </Button>
      <div>{children}</div>
    </div>
  );
}
