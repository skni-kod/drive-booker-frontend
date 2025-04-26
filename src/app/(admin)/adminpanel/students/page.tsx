'use client';

import { PaginationWithLinks } from '@/components/shared/PaginationWithLinks';
import { Input } from '@/components/ui/input';
import { fetchDrivers } from '@/services/adminpanel/fetchDrivers';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DriversList } from './_components/DriversList';

export default function StudentsContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const searchQuery = searchParams.get('search') || '';
  const router = useRouter();

  const [search, setSearch] = useState(searchQuery);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['drivers', page, searchQuery],
    queryFn: () => fetchDrivers(page, searchQuery),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, router]);

  const drivers = data?.data || [];
  const meta = data?.meta;

  if (isLoading) return <p>Ładowanie danych kursantów...</p>;
  if (isError) return <p>Błąd podczas pobierania danych.</p>;

  return (
    <div>
      <div className='mb-5 flex items-center'>
        <h2 className='text-xl font-semibold'>Lista kursantów</h2>
      </div>

      <div className='flex w-full max-w-4xl flex-col'>
        <div className='mb-5 flex justify-end'>
          <Input
            className='w-full max-w-xs'
            placeholder='Wyszukaj kursantów'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DriversList drivers={drivers} />

        {drivers.length > 0 && meta && (
          <div className='mt-8 flex justify-center'>
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
