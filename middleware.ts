import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];

export default async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  const requestPath = req.nextUrl.pathname;

  if (
    !session.isLoggedIn &&
    protectedRoutes.some((route) => requestPath.startsWith(route))
  ) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.toString());
    return NextResponse.redirect(loginUrl.toString());
  }

  if (
    session.isLoggedIn &&
    (requestPath.startsWith('/login') || requestPath.startsWith('/register'))
  ) {
    const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl.toString());
  }

  return NextResponse.next();
}
