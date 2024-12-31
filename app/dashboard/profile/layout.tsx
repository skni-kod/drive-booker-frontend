import { ReactNode } from 'react';

export default function ProfilePageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex'>
      <div className='flex-1 py-10'>
        <h1 className='mb-5 text-3xl'>Mój profil</h1>
        {children}
      </div>
    </div>
  );
}
