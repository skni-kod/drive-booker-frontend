import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.access_token) {
      config.headers.Authorization = `Bearer ${session.user.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosServerInstance = (accessToken: string): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${accessToken}`,
    },
  });

export default axiosInstance;
