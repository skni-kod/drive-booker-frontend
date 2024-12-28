'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const SortingFilteringToolbar = ({ cities }: { cities: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courseName, setCourseName] = useState('');

  const currentSort = searchParams.get('sort') || '';
  const currentCity = searchParams.get('city') || '';

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'clear') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    if (courseName === '') {
      updateQueryParams('name', 'clear');
    }
    if (courseName.trim()) {
      updateQueryParams('name', courseName.trim());
    }
  };

  return (
    <div className='flex w-5/6 max-w-4xl flex-col justify-between gap-2 py-4 md:flex-row'>
      <div className='flex flex-row gap-2 py-2 sm:py-0'>
        <Select
          value={currentSort}
          onValueChange={(value) => updateQueryParams('sort', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='SORTUJ' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='clear'>Domyślny</SelectItem>
            {/* <SelectSeparator /> */}
            <SelectItem value='price'>Od najtańszych</SelectItem>
            <SelectItem value='-price'>Od najdroższych</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={currentCity}
          onValueChange={(value) => updateQueryParams('city', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='LOKALIZACJA' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='clear'>Wszystkie</SelectItem>
            {cities.length > 0 ? (
              cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value={'clear'}>
                Brak miast
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-row gap-4'>
        <Input onChange={(e) => setCourseName(e.target.value)} />
        <Button onClick={handleSearch}>SZUKAJ</Button>
      </div>
    </div>
  );
};
