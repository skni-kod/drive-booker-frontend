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
        <h1 className='text-2xl font-bold'>Driving courses in your area</h1>
        <div className='flex max-w-4xl flex-col gap-2 sm:w-3/4'>
          <div className='flex w-full flex-col justify-between py-4 sm:flex-row'>
            <div className='flex flex-row gap-2 py-2 sm:py-0'>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Sort' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>some method</SelectItem>
                  <SelectItem value='2'>some method</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Location' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>some location</SelectItem>
                  <SelectItem value='2'>some location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-row gap-4'>
              <Input />
              <Button>Search</Button>
            </div>
          </div>
        </div>
        <Suspense fallback={<p>Loading courses...</p>}>
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
          Something went wrong. Please try again later.
        </p>
      </main>
    );
  }
}
