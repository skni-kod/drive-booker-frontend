import { axiosInstance } from '@/lib/axiosInstance';
import { SessionData, sessionOptions } from '@/lib/session';
import axios from 'axios';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const loginResponse = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      { email: email, password: password },
    );

    if (loginResponse.status === 200) {
      const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions,
      );

      session.access_token = loginResponse.data.access_token;
      session.isLoggedIn = true;
      await session.save();

      return new Response('Success!', { status: 200 });
    }

    return new Response('Invalid credentials.', { status: 401 });
  } catch (error) {
    console.error('Login error:', error);

    if (axios.isAxiosError(error)) {
      return new Response(
        error.response?.data?.message || 'Error during login.',
        { status: error.response?.status || 500 },
      );
    }

    return new Response('Internal server error.', { status: 500 });
  }
}
