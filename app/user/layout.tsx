import SideMenu from '@/components/SideMenu';
import { ReactNode } from 'react';

export default function ProfilePageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen '>
      <SideMenu />
      <div className='flex-1 px-20 pt-10'>
        <h1 className="text-3xl">Mój profil</h1>
        {children}
      </div>
    </div>
  );
}
