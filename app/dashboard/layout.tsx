import SideMenu from '@/components/SideMenu';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export default function ProfilePageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen'>
      {/* SIDE MENU */}
      <SideMenu />

      {/* CONTENT */}
      <div className='flex-1 overflow-auto px-4 pt-10 md:px-10'>{children}</div>
      <ToastContainer />
    </div>
  );
}
