'use server';

import { getServerAuthSession } from '@/lib/auth';

export const getTokenFromSession = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user?.access_token) {
    throw new Error('Authentication failed. Please login again.');
  }

  return session.user.access_token;
};
