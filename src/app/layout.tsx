import type { Metadata } from 'next';
import { ReactNode } from 'react';
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
    <html lang='pl'>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
