import { ProgressStats } from './_components/ProgressStats';
import { WeeklySchedule } from './_components/WeeklySchedule';

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-6 pt-2'>
      <WeeklySchedule />
      <ProgressStats />
    </div>
  );
};
export default DashboardPage;
