import { CalendarPlaceholder } from './_components/CalendarPlaceholder';
import { ProgressStats } from './_components/ProgressStats';
import { WeeklySchedule } from './_components/WeeklySchedule';

const DashboardPage = () => {
  return (
    <div className='grid grid-cols-1 gap-16 pt-2 xl:grid-cols-3'>
      <div className='xl:col-span-2'>
        <WeeklySchedule />
        <ProgressStats />
      </div>

      <div className='xl:col-span-1'>
        <CalendarPlaceholder />
      </div>
    </div>
  );
};
export default DashboardPage;
