'use client';
import { messages } from '@/constants/calendar';
import { getEventsQueryOptions } from '@/services/events/fetchEvents';
import { Event } from '@/services/events/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pl';
import { useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import './bigCalendarStyling.css';
import { SelectEventDialog } from './SelectEventDialog';

const BigCalendar = ({ endpoint }: { endpoint: string }) => {
  const eventsQueryOptions = getEventsQueryOptions(endpoint);
  const { data: events } = useSuspenseQuery(eventsQueryOptions);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  moment.locale('pl');
  const localizer = momentLocalizer(moment);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setPopoverOpen(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Calendar
        localizer={localizer}
        events={events || []}
        eventPropGetter={(event) => {
          const backgroundColor = event.status === 'pending' ? '#999' : '#090';
          return { style: { backgroundColor } };
        }}
        style={{ height: 700, width: '100%' }}
        date={date}
        onNavigate={handleNavigate}
        messages={messages}
        culture={'pl'}
        view={view}
        onView={handleViewChange}
        onSelectEvent={handleSelectEvent}
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
      {selectedEvent && (
        <SelectEventDialog
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          event={selectedEvent}
        />
      )}
    </div>
  );
};
export default BigCalendar;
