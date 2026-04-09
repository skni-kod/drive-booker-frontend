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

type BigCalendarProps = {
  role: string;
  defaultView?: View;
  availableViews?: View[];
  height?: number;
};

const BigCalendar = ({
  role,
  defaultView = Views.WEEK,
  availableViews,
  height = 700,
}: BigCalendarProps) => {
  const eventsQueryOptions = getEventsQueryOptions(role);
  const { data: events } = useSuspenseQuery(eventsQueryOptions);
  const [view, setView] = useState<View>(defaultView);
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
    if (role === 'instructor' && event.status === 'pending') {
      setSelectedEvent(event);
      setPopoverOpen(true);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Calendar
        localizer={localizer}
        events={events || []}
        eventPropGetter={(event) => {
          const backgroundColor =
            event.status === 'accepted'
              ? '#090'
              : event.status === 'rejected'
                ? '#900'
                : '#999'; // Default (pending)

          return { style: { backgroundColor } };
        }}
        style={{ height, width: '100%' }}
        date={date}
        onNavigate={handleNavigate}
        messages={messages}
        culture={'pl'}
        view={view}
        views={availableViews}
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
