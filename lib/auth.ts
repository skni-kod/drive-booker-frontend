import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Your Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await axiosInstance.get('/sanctum/csrf-cookie');

          const { data } = await axiosInstance.post(ApiRoutes.Login, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (!data) {
            console.log('No user data returned');
            return null;
          }
          return data;
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
