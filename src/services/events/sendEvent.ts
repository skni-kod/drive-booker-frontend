import { axiosInstance } from '@/lib/axiosInstance';
import { Event } from './types';

export async function sendEvent(event: Event): Promise<void> {
  try {
    return axiosInstance.post('/api/instructor/events', {
      title: event.title,
      driver_id: event.driverId,
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Could not create event');
  }
}
