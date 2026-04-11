import { DashboardCalendar } from './_components/DashboardCalendar';
import { DashboardWeeklySchedule } from './_components/DashboardWeeklySchedule';
import { MessagesPlaceholder } from './_components/MessagesPlaceholder';
import { ProgressStats } from './_components/ProgressStats';

const DashboardPage = () => {
  return (
    <div className='grid grid-cols-1 gap-16 pt-2 xl:grid-cols-3'>
      <div className='xl:col-span-2'>
        <DashboardWeeklySchedule />
        <ProgressStats />
      </div>

      <div className='space-y-8 xl:col-span-1'>
        <DashboardCalendar />
        <MessagesPlaceholder />
      </div>
    </div>
  );
};
export default DashboardPage;
