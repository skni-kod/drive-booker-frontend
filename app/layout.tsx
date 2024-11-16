import type { Metadata } from 'next';
import { ReactNode } from 'react';
import SessionWrapper from '../components/server/SessionWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'DriveBooker',
  description: 'App to book drive lessons',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
