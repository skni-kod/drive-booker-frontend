'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { User } from '@/types/user';

export async function getUserId() {
  const response = await axiosInstance.get<User>('/api/user');
  const userData = response.data;

  return userData.id;
}
