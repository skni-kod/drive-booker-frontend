'use client';
import moment from 'moment';
import 'moment/locale/pl';
import { SetStateAction, useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './bigCalendarStyling.css';

const messages = {
  allDay: 'Cały dzień',
  previous: 'Poprzedni',
  next: 'Następny',
  today: 'Dzisiaj',
  month: 'Miesiąc',
  week: 'Tydzień',
  day: 'Dzień',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Godzina',
  event: 'Wydarzenie',
  noEventsInRange: 'Brak wydarzeń w tym zakresie dat.',
};

const events = [
  {
    id: 1,
    title: 'Morning Meeting',
    start: new Date(2025, 1, 7, 9, 0, 0), // February 7, 2025, 9:00 AM
    end: new Date(2025, 1, 7, 10, 0, 0), // February 7, 2025, 10:00 AM
  },
  {
    id: 2,
    title: 'Lunch Break',
    start: new Date(2025, 2, 13, 12, 0, 0), // March 13, 2025, 12:00 PM
    end: new Date(2025, 2, 13, 13, 0, 0), // March 13, 2025, 1:00 PM
  },
  {
    id: 3,
    title: 'Afternoon Workshop',
    start: new Date(2025, 10, 6, 14, 0, 0), // November 6, 2025, 2:00 PM
    end: new Date(2025, 10, 6, 16, 0, 0), // November 6, 2025, 4:00 PM
  },
  {
    id: 4,
    title: 'All-Day Event',
    start: new Date(2025, 3, 9), // April 9, 2025 (all-day)
    end: new Date(2025, 3, 9),
    allDay: true,
  },
  {
    id: 5,
    title: 'Evening Networking',
    start: new Date(2025, 3, 11, 18, 30, 0), // April 11, 2025, 6:30 PM
    end: new Date(2025, 3, 11, 20, 0, 0), // April 11, 2025, 8:00 PM
  },
];

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  moment.locale('pl');
  const localizer = momentLocalizer(moment);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: SetStateAction<View>) => {
    setView(newView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      style={{ height: 700, width: '100%' }}
      date={date}
      onNavigate={handleNavigate}
      messages={messages}
      culture={'pl'}
      view={view}
      onView={handleViewChange}
      formats={{
        agendaHeaderFormat: ({ start, end }) => {
          return (
            moment(start).format('DD-MM-YYYY') +
            ' — ' +
            moment(end).format('DD-MM-YYYY')
          );
        },
      }}
    />
  );
};
export default BigCalendar;
