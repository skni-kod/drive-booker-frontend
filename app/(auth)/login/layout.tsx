import { ReactNode } from 'react';

export default function LoginLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex h-screen'>
      <div className='flex w-full items-center justify-center lg:w-1/2'>
        {children}
      </div>
      <div className="hidden bg-[length:auto_1080px] sm:block sm:h-full sm:w-1/2 sm:bg-[url('/images/login-background.svg')] sm:bg-contain sm:bg-right sm:bg-repeat-y" />
    </div>
  );
}
