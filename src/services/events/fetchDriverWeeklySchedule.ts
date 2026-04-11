import { axiosInstance } from '@/lib/axiosInstance';
import { queryOptions } from '@tanstack/react-query';
import { Event } from './types';

interface DriverEventsResponse {
  data: {
    id: number;
    title: string;
    start: string;
    end: string;
    status: 'pending' | 'accepted' | 'rejected';
    location: string | null;
  }[];
}

export async function fetchDriverWeeklySchedule(): Promise<Event[]> {
  try {
    const response = await axiosInstance.get<DriverEventsResponse>(
      '/api/driver/events',
      {
        params: {
          status: 'accepted',
          week: 'current',
        },
      },
    );

    const events = response.data.data || [];

    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  } catch (error) {
    console.error('Failed to fetch weekly schedule:', error);
    throw new Error('Could not load weekly schedule');
  }
}

export const getDriverWeeklyScheduleQueryOptions = () =>
  queryOptions({
    queryKey: ['driverWeeklySchedule'],
    queryFn: fetchDriverWeeklySchedule,
  });
