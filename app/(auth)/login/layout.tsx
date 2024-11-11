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
      <div className="hidden bg-[length:auto_1080px] md:block md:h-full md:w-1/2 md:bg-[url('/images/login-background.svg')] md:bg-contain md:bg-right md:bg-repeat-y" />
    </div>
  );
}
