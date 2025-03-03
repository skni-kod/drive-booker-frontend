'use client';

import { PaginationWithLinks } from '@/components/shared/Pagination/PaginationComponent';
import { Button } from '@/components/ui/button';
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
  const [loadingId, setLoadingId] = useState<number | null>(null); // do animacji przetwarzania zapytania

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course-requests', page],
    queryFn: () => fetchCourseRequests(page),
    staleTime: 60 * 1000,
  });

  const requests = data?.data || [];
  const meta = data?.meta;

  const mutation = useMutation({
    mutationFn: async ({ id, action }: { id: number; action: string }) => {
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

  const handleAction = (id: number, action: 'accept' | 'decline') => {
    mutation.mutate({ id, action });
  };

  if (isLoading)
    return <p className='text-center text-gray-500'>Ładowanie danych...</p>;
  if (isError)
    return (
      <p className='text-center text-red-500'>
        Błąd podczas pobierania danych.
      </p>
    );

  return (
    <div className='mt-6 max-w-4xl'>
      <h2 className='mb-4 text-left text-2xl font-semibold'>
        Lista zgłoszeń do kursu
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full rounded-lg border border-gray-200 bg-white shadow-md'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border p-3'>Imię</th>
              <th className='border p-3'>Nazwisko</th>
              <th className='border p-3'>Email</th>
              <th className='border p-3'>Telefon</th>
              <th className='border p-3'>Status</th>
              <th className='border p-3'>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((request) => (
              <tr key={request.id} className='hover:bg-gray-50'>
                <td className='border p-3'>{request.name}</td>
                <td className='border p-3'>{request.last_name}</td>
                <td className='border p-3'>{request.email}</td>
                <td className='border p-3'>{request.phone}</td>
                <td className='border p-3'>
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      request.status === 'accepted'
                        ? 'bg-green-200 text-green-800'
                        : request.status === 'pending'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className='flex justify-center gap-2 border p-3'>
                  <Button
                    onClick={() => handleAction(request.id, 'accept')}
                    disabled={loadingId === request.id}
                    className={`rounded px-3 py-1 text-sm text-white transition ${
                      loadingId === request.id
                        ? 'bg-green-300'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {loadingId === request.id ? '...' : 'Akceptuj'}
                  </Button>
                  <Button
                    onClick={() => handleAction(request.id, 'decline')}
                    disabled={loadingId === request.id}
                    className={`rounded px-3 py-1 text-sm text-white transition ${
                      loadingId === request.id
                        ? 'bg-red-300'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {loadingId === request.id ? '...' : 'Odrzuć'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length > 0 && meta && (
          <div className='col-span-2 mt-4 flex justify-center'>
            <PaginationWithLinks
              page={meta.current_page}
              totalCount={meta.total}
              pageSize={meta.per_page}
            />
          </div>
        )}
      </div>
    </div>
  );
}
