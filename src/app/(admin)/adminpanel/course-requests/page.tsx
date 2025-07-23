'use client';

import { PaginationWithLinks } from '@/components/shared/PaginationWithLinks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AdminPanelApiRoutes } from '@/enums/routes';
import { axiosInstance } from '@/lib/axiosInstance';
import { fetchCourseRequests } from '@/services/adminpanel/fetchCourseRequests';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CourseRequests() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course-requests', page],
    queryFn: () => fetchCourseRequests(page),
    staleTime: 60 * 1000,
  });

  const requests = data?.data || [];
  const meta = data?.meta;

  const mutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: string }) => {
      setLoadingId(id);
      const url = `${AdminPanelApiRoutes.Course_Registrations}/${id}/${action}`;
      await axiosInstance.post(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-requests', page] });
      setLoadingId(null);
    },
    onSettled: () => {
      setLoadingId(null);
    },
  });

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    mutation.mutate({ id, action });
  };

  return (
    <div className='container mx-auto max-w-6xl py-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl'>Zgłoszenia do kursu</CardTitle>
              <CardDescription>
                Przeglądaj i zarządzaj zgłoszeniami uczestników
              </CardDescription>
            </div>
            {isLoading && <Badge variant='secondary'>Ładowanie...</Badge>}
            {isError && (
              <Badge variant='destructive'>
                Błąd podczas pobierania danych
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {data && (
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr className='border-b'>
                    <th className='p-3 text-left font-medium'>Imię</th>
                    <th className='p-3 text-left font-medium'>Nazwisko</th>
                    <th className='p-3 text-left font-medium'>Email</th>
                    <th className='p-3 text-left font-medium'>Telefon</th>
                    <th className='p-3 text-left font-medium'>Status</th>
                    <th className='p-3 text-center font-medium'>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((request) => (
                    <tr key={request.id} className='border-b hover:bg-muted/50'>
                      <td className='p-3'>{request.name}</td>
                      <td className='p-3'>{request.last_name}</td>
                      <td className='p-3'>{request.email}</td>
                      <td className='p-3'>{request.phone}</td>
                      <td className='p-3'>
                        <Badge
                          variant={
                            request.status === 'accepted'
                              ? 'default'
                              : request.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                      <td className='p-3'>
                        <div className='flex justify-center gap-2'>
                          <Button
                            onClick={() => handleAction(request.id, 'accept')}
                            disabled={loadingId === request.id}
                            size='sm'
                            variant='default'
                          >
                            {loadingId === request.id ? '...' : 'Akceptuj'}
                          </Button>
                          <Button
                            onClick={() => handleAction(request.id, 'decline')}
                            disabled={loadingId === request.id}
                            size='sm'
                            variant='destructive'
                          >
                            {loadingId === request.id ? '...' : 'Odrzuć'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        <div className='pb-6'>
          {requests.length > 0 && meta && (
            <PaginationWithLinks
              page={Number(meta.current_page)}
              totalCount={meta.total}
              pageSize={meta.per_page}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
