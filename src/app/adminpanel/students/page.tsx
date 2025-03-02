'use client';

import { PaginationWithLinks } from '@/components/shared/Pagination/PaginationComponent';
import { Input } from '@/components/ui/input';
import { fetchDrivers } from '@/services/adminpanel/fetchDrivers';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

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

  // delay do wyszukiwania, zeby nie robic requestow zbyt czesto
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
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-xl'>Lista kursantów</h2>
        <div className='flex gap-4'>
          <Input
            placeholder='Wyszukaj kursantów'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
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
