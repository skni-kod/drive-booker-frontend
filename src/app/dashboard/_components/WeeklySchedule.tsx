'use client';

import { getDriverWeeklyScheduleQueryOptions } from '@/services/events/fetchDriverWeeklySchedule';
import { Event } from '@/services/events/types';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type ScheduleItem = {
  id: string;
  isNext: boolean;
  title: string;
  date: string;
  location: string;
};

const formatScheduleDate = (date: Date) => {
  const value = format(date, 'EEEE HH:mm', { locale: pl });
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const mapEventsToSchedule = (events: Event[]): ScheduleItem[] => {
  const sortedEvents = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );

  const nextEventIndex = sortedEvents.findIndex(
    (event) => event.start.getTime() >= Date.now(),
  );

  return sortedEvents.map((event, index) => ({
    id: String(event.id ?? `${event.start.toISOString()}-${index}`),
    isNext: nextEventIndex !== -1 && index === nextEventIndex,
    title: event.title ?? 'Jazda',
    date: formatScheduleDate(event.start),
    location: event.location ?? 'Brak adresu szkoły',
  }));
};

export function WeeklySchedule() {
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery(getDriverWeeklyScheduleQueryOptions());

  const schedule = mapEventsToSchedule(events);

  return (
    <section>
      <h2 className='mb-4 text-xl font-medium text-gray-800'>Twój tydzień</h2>
      {isLoading && (
        <div className='rounded-2xl border border-gray-100 bg-[#FAFAFA] px-5 py-4 text-sm text-gray-500'>
          Ładowanie harmonogramu...
        </div>
      )}

      {isError && (
        <div className='rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600'>
          Nie udało się pobrać harmonogramu.
        </div>
      )}

      {!isLoading && !isError && schedule.length === 0 && (
        <div className='rounded-2xl border border-gray-100 bg-[#FAFAFA] px-5 py-4 text-sm text-gray-500'>
          Brak potwierdzonych jazd w bieżącym tygodniu.
        </div>
      )}

      {!isLoading && !isError && schedule.length > 0 && (
        <div className='flex flex-col gap-3'>
          {schedule.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between gap-4 rounded-2xl px-5 py-4 sm:flex-row sm:items-end ${
                item.isNext
                  ? 'bg-[#0B5DB8] text-white shadow-sm'
                  : 'border border-gray-100 bg-[#FAFAFA] text-gray-900'
              }`}
            >
              <div>
                {item.isNext && (
                  <p className='mb-1 text-xs font-medium text-blue-200'>
                    Nadchodzące
                  </p>
                )}
                <h3 className='text-lg font-medium'>{item.title}</h3>
                <p
                  className={`text-sm ${
                    item.isNext ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {item.date}
                </p>
              </div>
              <div
                className={`text-sm ${
                  item.isNext ? 'text-blue-100' : 'text-gray-600'
                }`}
              >
                {item.location}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
