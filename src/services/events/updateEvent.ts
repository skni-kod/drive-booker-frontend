import { axiosInstance } from '@/lib/axiosInstance';
import { Event } from './types';

export async function updateEvent(event: Event): Promise<void> {
  try {
    return axiosInstance.put(`/api/events/${event.id}`, {
      title: event.title,
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error('Failed to update event:', error);
    throw new Error('Could not update event');
  }
}
