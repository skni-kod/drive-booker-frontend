import { SessionOptions } from 'iron-session';

export interface SessionData {
  access_token: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: `${process.env.SESSION_SECRET}`,
  cookieName: 'session',
  cookieOptions: {
    maxAge: 360,
    secure: process.env.NODE_ENV === 'production',
  },
};
