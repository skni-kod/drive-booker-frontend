import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  AdminRoutes,
  AuthorizedRoute,
  UnAuthorizedRoute,
} from './enums/routes';

const protectedRoutes = [
  AuthorizedRoute.Dashboard,
  AuthorizedRoute.Profile,
  AuthorizedRoute.FillProfile,
];

const adminRoutes = [AdminRoutes.Panel];

const publicRoutes = [UnAuthorizedRoute.Login, UnAuthorizedRoute.Register];

function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

function isAdminRoute(path: string): boolean {
  return adminRoutes.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path.startsWith(route));
}

export default async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  const { pathname, origin } = req.nextUrl;

  const redirect = (to: string) => NextResponse.redirect(new URL(to, origin));

  // Not logged in: block access to protected routes
  if (!session.isLoggedIn && isProtectedRoute(pathname)) {
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  // Logged in but profile not completed: redirect to fill_profile
  if (
    session.isLoggedIn &&
    !session.isCompleted &&
    !pathname.startsWith(AuthorizedRoute.FillProfile)
  ) {
    return redirect(AuthorizedRoute.FillProfile);
  }

  // Logged in: prevent access to login/register
  if (session.isLoggedIn && session.isCompleted && isPublicRoute(pathname)) {
    const target = session.role?.includes('owner')
      ? '/adminpanel'
      : '/dashboard';
    return redirect(target);
  }

  // Admin-only route access restriction
  if (isAdminRoute(pathname) && !session.role?.includes('owner')) {
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
