'use client';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Button onClick={logout} className='ml-auto w-1/4'>
        LOGOUT
      </Button>
      <div>{children}</div>
    </div>
  );
}
