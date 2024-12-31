import { axiosInstance } from '@/lib/axiosInstance';
import { UserPage } from '@/types/user';

export const fetchUserData = async (id: string): Promise<UserPage | null> => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};
