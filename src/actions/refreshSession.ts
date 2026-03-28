'use server';

import { SessionData, sessionOptions } from '@/lib/session';
import { fetchUserData } from '@/services/profile/fetchUserData';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { getUserId } from './getUserId';

export async function refreshSession() {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error('User ID not found in session');
    }

    const user = await fetchUserData(userId);
    if (!user) {
      throw new Error('Failed to fetch user data');
    }

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions,
    );

    session.isCompleted = user.is_completed;
    await session.save();

    return true;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    return false;
  }
}
