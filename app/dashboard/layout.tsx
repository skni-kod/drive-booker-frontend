'use client';

import SideMenu from '@/components/SideMenu';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen'>
      <SideMenu />
      <div className='flex-1 px-20'>{children}</div>
      <ToastContainer />
    </div>
  );
}
