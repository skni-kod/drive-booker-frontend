import { AuthorizedRoute, UnAuthorizedRoute } from '@/enums/routes';
import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const authToken = (await cookies()).get('auth_token')?.value;
    const role = (await cookies()).get('roles')?.value;
    const isCompleted: boolean = JSON.parse(
      (await cookies()).get('is_completed')?.value ?? 'false',
    );

    if (!authToken) {
      return new Response('No auth token found', { status: 401 });
    }

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions,
    );

    if (!session) {
      return new Response('failed to create session', { status: 500 });
    }

    session.access_token = authToken;
    session.isLoggedIn = true;
    session.role = role ? JSON.parse(role) : [];
    session.isCompleted = isCompleted;

    await session.save();

    return Response.redirect(
      `${process.env.BASE_URL}${AuthorizedRoute.Dashboard}`,
      302,
    );
  } catch (error) {
    console.error('Error in /api/login/google:', error);
    return Response.redirect(
      `${process.env.BASE_URL}${UnAuthorizedRoute.Login}`,
      500,
    );
  }
}
