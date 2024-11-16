import 'next-auth';
import { DefaultSession } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  interface Session {
    access_token: string;
    user: {
      id: string;
      access_token: string;
      user: DefaultSession['user'];
    } & Session['user'];
  }
  interface JWT {
    access_token: string;
  }
  interface User {
    access_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    user: User | AdapterUser;
  }
}
