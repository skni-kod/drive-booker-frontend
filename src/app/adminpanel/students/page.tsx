'use client';

import { PaginationWithLinks } from '@/components/shared/Pagination/PaginationComponent';
import { Button } from '@/components/ui/button';
import { fetchDrivers } from '@/services/adminpanel/fetchDrivers';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function StudentsContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['drivers', page],
    queryFn: () => fetchDrivers(page),
    staleTime: 60 * 1000,
  });

  const drivers = data?.data || [];
  const meta = data?.meta;

  if (isLoading) return <p>Ładowanie danych kursantów...</p>;
  if (isError) return <p>Błąd podczas pobierania danych.</p>;

  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-xl'>Lista kursantów</h2>
        <div className='flex gap-4'>
          <Button>
            WYSZUKAJ{' '}
            <span className='ml-2'>
              <Search />
            </span>
          </Button>
        </div>
      </div>
      <div className='grid cursor-pointer grid-cols-2 gap-4'>
        {drivers.map((driver) => (
          <div key={driver.id} className='rounded-lg bg-gray-300 p-4'>
            {driver.name} {driver.last_name}
          </div>
        ))}

        {drivers.length > 0 && meta && (
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
