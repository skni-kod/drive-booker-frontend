import { axiosInstance } from '@/lib/axiosInstance';
import { Event } from './types';

export async function deleteEvent(event: Event): Promise<void> {
  try {
    return axiosInstance.delete(`/api/events/${event.id}`);
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw new Error('Could not delete event');
  }
}
