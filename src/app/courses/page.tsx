import { PaginationWithLinks } from '@/components/shared/PaginationWithLinks';
import { fetchCourses } from '@/services/courses/fetchCourses';
import { fetchLocations } from '@/services/courses/fetchLocations';
import { Suspense } from 'react';
import { CoursesList } from './_components/CoursesList';
import { SortingFilteringToolbar } from './_components/SortingFilteringToolbar';

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
  searchParams: Promise<SearchParams>;
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
      <main className='min-h-screen bg-slate-50 text-slate-900'>
        <section
          className='bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage:
              "url('/assets/images/courses-header-background.svg')",
          }}
        >
          <div className='mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between'>
            <div className='max-w-2xl space-y-4 text-center lg:text-left'>
              <h1 className='text-3xl font-extrabold leading-tight md:text-5xl'>
                Ucz się w nowoczesny
                <br className='hidden md:block' /> i wygodny sposób
              </h1>
              <p className='text-sm leading-relaxed text-slate-700 md:text-base'>
                Znajdź kurs nauki jazdy dopasowany do Twoich potrzeb i
                rozpocznij swoją drogę do prawa jazdy z najlepszymi
                instruktorami w okolicy.
              </p>
            </div>
            <object
              data='/assets/images/courses-hero-illustration.svg'
              type='image/svg+xml'
              aria-label='Ilustracja samochodu i kursu nauki jazdy'
              className='h-full w-full rounded-2xl object-contain'
            />
          </div>
        </section>

        <section className='mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4'>
          <div className='mb-8 text-center'>
            <h2 className='text-2xl font-bold md:text-3xl'>
              Kursy nauki jazdy w Twojej okolicy
            </h2>
            <p className='mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base'>
              Wybierz kurs i zapisuj się do sprawdzonych szkół jazdy. Filtruj po
              lokalizacji, kategorii i nazwie, aby szybciej znaleźć idealną
              ofertę.
            </p>
          </div>

          <Suspense
            fallback={
              <div className='rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm'>
                <p className='text-slate-600'>Wczytywanie kursów...</p>
              </div>
            }
          >
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
        </section>
      </main>
    );
  } catch (error) {
    console.error('Failed to load courses:', error);
    return (
      <main className='flex min-h-screen items-center justify-center bg-slate-50 px-6'>
        <div className='w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm'>
          <p className='text-sm font-medium text-red-600'>
            Coś poszło nie tak. Spróbuj ponownie później.
          </p>
        </div>
      </main>
    );
  }
}
