import { Suspense } from 'react';
import { fetchCourses } from '../../services/courses/fetchCourses';
import { fetchLocations } from '../../services/courses/fetchLocations';
import { CoursesList } from './_components/CoursesList';
import { SortingFilteringToolbar } from './_components/SortingFilteringToolbar';
import { PaginationWithLinks } from './_components/PaginationComponent';

interface SearchParams {
  page?: string;
  sort?: string;
  category?: string;
  city?: string;
  name?: string;
}

export default async function CoursePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    const pageParams = await searchParams;
    const cities = await fetchLocations();
    const { data, meta } = await fetchCourses(
      pageParams.page,
      pageParams.sort,
      pageParams.category,
      pageParams.city,
      pageParams.name,
    );

    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-center text-2xl font-bold'>
          Kursy nauki jazdy w twojej okolicy
        </h1>
        <Suspense fallback={<p>Wczytywanie kursów...</p>}>
          <SortingFilteringToolbar cities={cities} />
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
