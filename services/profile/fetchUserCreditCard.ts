import { axiosInstance } from '@/lib/axiosInstance';
import { UserCreditCard } from '@/types/user';

export const fetchUserCreditCard = async (
  id: string,
): Promise<UserCreditCard | null> => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}/credit-card`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch credit card data:', error);
    return null;
  }
};
