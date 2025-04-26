import { axiosInstance } from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { adminEvent } from './types';

export async function getPendingEvents(page: number) {
  try {
    const response = await axiosInstance.get<adminEvent>(
      `/api/admin/events/pending?page=${page}`,
    );
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Could not load events');
  }
}

export function usePendingEvents(page: number) {
  return useQuery({
    queryKey: ['pendingEvents', page],
    queryFn: () => getPendingEvents(page),
    staleTime: 10000, // Cache for 10s
    refetchInterval: 15000, // Refetch every 15s
  });
}
