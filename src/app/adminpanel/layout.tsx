import SideMenu from '@/app/dashboard/_components/SideMenu';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function DashboardLayout({
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
