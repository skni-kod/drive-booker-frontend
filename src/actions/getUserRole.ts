'use server';

import { getSession } from '@/actions/getSession';

export async function getUserRoles() {
  const session = await getSession();
  return session.role || [];
}
