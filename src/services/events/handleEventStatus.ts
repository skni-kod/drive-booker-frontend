import { axiosInstance } from '@/lib/axiosInstance';

export const handleEventChange = async (
  id: string,
  action: 'accept' | 'reject',
) => {
  try {
    await axiosInstance.post(`/api/admin/events/${id}/${action}`);
  } catch (error) {
    console.error('Update error:', error);
  }
};
