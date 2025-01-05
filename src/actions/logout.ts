'use server';

import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  session.destroy();
  revalidatePath('/');
  redirect('/login');
}
