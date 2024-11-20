import { getServerAuthSession } from '@/lib/auth';
import CustomSessionProvider from '@/providers/Session.provider';
import { ReactNode } from 'react';

type SessionWrapperProps = {
  children: ReactNode;
};

export default async function SessionWrapper({
  children,
}: SessionWrapperProps) {
  const session = await getServerAuthSession();

  return (
    <CustomSessionProvider session={session}>{children}</CustomSessionProvider>
  );
}
