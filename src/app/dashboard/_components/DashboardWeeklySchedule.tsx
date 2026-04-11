import { checkUserRole } from '@/actions/checkUserRole';
import { getQueryClient } from '@/lib/getQueryClient';
import { getDriverWeeklyScheduleQueryOptions } from '@/services/events/fetchDriverWeeklySchedule';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { WeeklySchedule } from './WeeklySchedule';

export async function DashboardWeeklySchedule() {
  const { hasRole } = await checkUserRole();

  if (!hasRole(['driver'])) {
    return null;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getDriverWeeklyScheduleQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklySchedule />
    </HydrationBoundary>
  );
}
