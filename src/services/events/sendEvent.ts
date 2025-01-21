import { axiosInstance } from '@/lib/axiosInstance';
import { Event } from './types';

export async function sendEvent(event: Event): Promise<void> {
  try {
    return axiosInstance.post('/api/events', {
      title: event.title,
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Could not create event');
  }
}
