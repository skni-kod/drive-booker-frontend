import { handleEventChange } from '@/services/events/handleEventStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEventStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'accept' | 'reject' }) =>
      handleEventChange(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingEvents'] });
    },
    onError: () => {
      console.error('Failed to update event status');
    },
  });
}
