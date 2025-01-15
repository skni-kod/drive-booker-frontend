import AddEventDialog from './_components/AddEventDialog';
import BigCalendar from './_components/BigCalendar/BigCalendar';

const CalendarPage = () => {
  return (
    <main className='container'>
      <AddEventDialog />
      <BigCalendar />
    </main>
  );
};
export default CalendarPage;
