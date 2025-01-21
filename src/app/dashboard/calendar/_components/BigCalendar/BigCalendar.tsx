'use client';
import { messages } from '@/constants/calendar';
import { eventsQueryOptions } from '@/services/events/fetchEvents';
import { useSuspenseQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pl';
import { SetStateAction, useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './bigCalendarStyling.css';

const BigCalendar = () => {
  const { data: events } = useSuspenseQuery(eventsQueryOptions);
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
      events={events || []}
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
