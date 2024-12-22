import { ReactNode } from 'react';

export default function ProfilePageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen '>
      <div className='flex-1'>
        <h1 className="text-3xl pb-5 pt-10">Mój profil</h1>
        {children}
      </div>
    </div>
  );
}
