'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { getQueryClient } from '@/lib/getQueryClient';
import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const queryClient = getQueryClient();
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  //remove token on backend
  await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`);

  session.destroy();
  queryClient.clear();
  revalidatePath('/');
  redirect('/login');
}
