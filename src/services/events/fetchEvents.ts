import { axiosInstance } from '@/lib/axiosInstance';
import { queryOptions } from '@tanstack/react-query';
import { Event } from './types';

export async function fetchEvents(endpoint: string) {
  try {
    const response = await axiosInstance.get<{ data: Event[] }>(
      `/api/${endpoint}/events`,
    );
    const events = response.data.data || [];
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Could not load events');
  }
}

export const getEventsQueryOptions = (endpoint: string) =>
  queryOptions({
    queryKey: ['events'],
    queryFn: () => fetchEvents(endpoint),
  });
