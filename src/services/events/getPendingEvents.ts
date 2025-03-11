import { axiosInstance } from '@/lib/axiosInstance';
import { adminEvent } from './types';

export async function getPendingEvents() {
  try {
    const response = await axiosInstance.get<adminEvent[]>(
      `/api/admin/events/pending`,
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Could not load events');
  }
}
