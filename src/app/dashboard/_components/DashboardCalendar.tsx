import { checkUserRole } from '@/actions/checkUserRole';
import { Skeleton } from '@/components/ui/skeleton';
import { getQueryClient } from '@/lib/getQueryClient';
import { getEventsQueryOptions } from '@/services/events/fetchEvents';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import BigCalendar from '../calendar/_components/BigCalendar/BigCalendar';

export async function DashboardCalendar() {
  const queryClient = getQueryClient();
  const { hasRole } = await checkUserRole();
  const role = hasRole(['instructor']) ? 'instructor' : 'driver';

  await queryClient.prefetchQuery(getEventsQueryOptions(role));

  return (
    <section>
      <h2 className='mb-4 text-xl font-medium text-gray-800'>Kalendarz</h2>
      <Suspense fallback={<Skeleton className='h-96 w-full' />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BigCalendar
            role={role}
            defaultView='month'
            availableViews={['month']}
            height={384}
          />
        </HydrationBoundary>
      </Suspense>
    </section>
  );
}
