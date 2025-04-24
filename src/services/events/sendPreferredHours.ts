import { axiosInstance } from '@/lib/axiosInstance';
import { Event } from './types';

export async function sendPreferredHours(event: Event): Promise<void> {
  try {
    return axiosInstance.post('/api/driver/events', {
      title: 'jazdy',
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Could not create event');
  }
}

export async function sendBatchPreferredHours(events: Event[]): Promise<void> {
  try {
    await Promise.all(events.map((event) => sendPreferredHours(event)));
  } catch (error) {
    console.error('Failed to save batch events:', error);
    throw new Error('Could not save batch events');
  }
}
