import { checkUserRole } from '@/actions/checkUserRole';
import { RoleGuard } from '@/components/shared/RoleGuard';
import { Skeleton } from '@/components/ui/skeleton';
import { getQueryClient } from '@/lib/getQueryClient';
import { fetchDrivers } from '@/services/events/fetchDrivers';
import { getEventsQueryOptions } from '@/services/events/fetchEvents';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import AddEventDialog from './_components/AddEventDialog';
import BigCalendar from './_components/BigCalendar/BigCalendar';

export default async function CalendarPage() {
  const queryClient = getQueryClient();

  // Determine role from session
  const { hasRole } = await checkUserRole();
  const role = hasRole(['instructor']) ? 'instructor' : 'driver';
  const drivers = hasRole(['instructor']) ? await fetchDrivers() : [];

  // Prefetch the events on the server side
  await queryClient.prefetchQuery(getEventsQueryOptions(role));

  return (
    <main className='container'>
      <Suspense
        fallback={
          <div className='space-y-4'>
            <Skeleton className='mb-1 mt-4 h-10 w-full' />
            <Skeleton className='h-[700px] w-full' />
          </div>
        }
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <RoleGuard allowedRoles={['instructor']}>
            <AddEventDialog drivers={drivers} />
          </RoleGuard>
          <BigCalendar role={role} />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}
