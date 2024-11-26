import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance, { axiosServerInstance } from '@/lib/axiosInstance';
import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'email-based',
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
    CredentialsProvider({
      id: 'google-based',
      name: 'Google provider',
      credentials: {
        token: { label: 'JWT Token', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const access_token = credentials?.token;

          if (!access_token) return null;

          await axiosInstance.get('/sanctum/csrf-cookie');

          const response =
            await axiosServerInstance(access_token).get('/api/user');
          const user = response.data;

          if (!user) {
            console.error('User data is incomplete or missing');
            return null;
          }

          return {
            id: user.id,
            user,
            access_token,
          };
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
