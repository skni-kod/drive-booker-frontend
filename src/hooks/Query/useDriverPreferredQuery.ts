import { fetchAvailabilityForDriver } from '@/services/events/fetchAvailability';
import { sendBatchPreferredHours } from '@/services/events/sendPreferredHours';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDriverPreferredQuery = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['instructorAvailability'],
    queryFn: fetchAvailabilityForDriver,
  });

  const mutation = useMutation({
    mutationFn: sendBatchPreferredHours,
    onSuccess: () => {
      toast.success('Preferencje zapisane!');
      queryClient.invalidateQueries({
        queryKey: ['instructorAvailability'],
      });
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: () => {
      toast.error('Błąd zapisu preferencji.');
    },
  });

  return { data, isLoading, error, mutation };
};
