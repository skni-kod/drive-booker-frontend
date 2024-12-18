import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Suspense } from 'react';
import { CoursesList } from './CoursesList';
import { fetchCourses } from './fetchCourses';
import { PaginationWithLinks } from './paginationComponent';

interface SearchParams {
  page?: string;
}

export default async function CoursePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    const pageParams = await searchParams;
    const { data, meta } = await fetchCourses(pageParams.page);

    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>
          Kursy nauki jazdy w twojej okolicy
        </h1>
        {/* This should be in separate component with handling filtering  */}
        <div className='flex w-5/6 max-w-4xl flex-col justify-between gap-2 py-4 md:flex-row'>
          <div className='flex flex-row gap-2 py-2 sm:py-0'>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='SORTUJ' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>od najtańszych</SelectItem>
                <SelectItem value='2'>od najdroższych</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='LOKALIZACJA' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>Rzeszów</SelectItem>
                <SelectItem value='2'>Kraków</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-row gap-4'>
            <Input />
            <Button>SZUKAJ</Button>
          </div>
        </div>
        <Suspense fallback={<p>Wczytywanie kursów...</p>}>
          <CoursesList courses={data} />
          {data.length > 0 && (
            <PaginationWithLinks
              page={meta.current_page}
              totalCount={meta.total}
              pageSize={meta.per_page}
            />
          )}
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error('Failed to load courses:', error);
    return (
      <main>
        <p className='text-red-500'>
          Coś poszło nie tak. Spróbuj ponownie później.
        </p>
      </main>
    );
  }
}
