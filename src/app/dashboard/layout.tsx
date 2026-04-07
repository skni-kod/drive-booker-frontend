import DashboardNavbar from '@/app/dashboard/_components/DashboardNavbar';
import SideMenu from '@/app/dashboard/_components/SideMenu';
import { ReactNode } from 'react';
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
      <div className='flex-1 overflow-auto px-4 py-6 md:px-16'>
        <div className='space-y-6'>
          <DashboardNavbar />
          {children}
        </div>
      </div>
    </div>
  );
}
