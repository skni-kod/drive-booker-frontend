'use server';

import { getSession } from '@/actions/getSession';

export async function checkUserRole() {
  const session = await getSession();
  const role = session.role || [];

  const hasRole = (allowedRoles: string[]) =>
    role.some((r) => allowedRoles.includes(r));

  return { hasRole };
}
