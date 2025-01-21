import { Skeleton } from '@/components/ui/skeleton';
import { getQueryClient } from '@/lib/getQueryClient';
import { eventsQueryOptions } from '@/services/events/fetchEvents';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import AddEventDialog from './_components/AddEventDialog';
import BigCalendar from './_components/BigCalendar/BigCalendar';

export default async function CalendarPage() {
  const queryClient = getQueryClient();

  // Prefetch the events on the server side
  await queryClient.prefetchQuery(eventsQueryOptions);

  return (
    <main className='container'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AddEventDialog />
        <Suspense
          fallback={
            <div className='space-y-4'>
              <Skeleton className='h-[700px] w-full' />
            </div>
          }
        >
          <BigCalendar />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
