'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  fetchAvailability,
  TimeSlot,
} from '@/services/events/fetchAvailability';
import { sendAvailability } from '@/services/events/sendAvailability';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addDays, addWeeks, format, parseISO, startOfWeek } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

interface TimeSlotState {
  day: string;
  time: string;
  selected: boolean;
  booked: boolean;
}

interface DayAvailability {
  date: Date;
  dayName: string;
  timeSlots: TimeSlotState[];
}

interface WeekAvailability {
  weekStart: Date;
  days: DayAvailability[];
}

const initializeWeekAvailability = (
  startDate: Date,
  backendData: TimeSlot[],
): WeekAvailability => {
  const timeSlots = generateTimeSlots();
  const days: DayAvailability[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i);
    const dayString = format(date, 'yyyy-MM-dd');
    const dayName = format(date, 'EEEE', { locale: pl });

    const dayTimeSlots: TimeSlotState[] = timeSlots.map((time) => {
      const matchingSlot = backendData.find(
        (slot) =>
          format(parseISO(slot.start_time), 'yyyy-MM-dd') === dayString &&
          format(parseISO(slot.start_time), 'HH:mm') === time,
      );

      return {
        day: dayString,
        time,
        selected: matchingSlot?.status === 'available',
        booked: matchingSlot?.status === 'booked',
      };
    });

    days.push({ date, dayName, timeSlots: dayTimeSlots });
  }

  return { weekStart: startDate, days };
};

export default function AvailabilityCheck() {
  const today = new Date();
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const nextWeekStart = addWeeks(currentWeekStart, 1);

  const { data, isLoading } = useQuery({
    queryKey: ['availability'],
    queryFn: fetchAvailability,
  });

  const { mutate: saveAvailability, isPending } = useMutation({
    mutationFn: async () => {
      if (!currentWeek || !nextWeek || !data) return;

      const selectedSlots: TimeSlot[] = [];

      // Collect selected slots from both weeks
      [currentWeek, nextWeek].forEach((week) => {
        week.days.forEach((day) => {
          day.timeSlots.forEach((slot) => {
            if (slot.selected && !slot.booked) {
              const slotDateTime = new Date(`${slot.day}T${slot.time}:00Z`);
              if (slotDateTime >= new Date(today)) {
                selectedSlots.push({
                  start_time: `${slot.day}T${slot.time}:00Z`,
                  end_time: `${slot.day}T${parseInt(slot.time) + 1}:00Z`,
                  status: `available`,
                });
              }
            }
          });
        });
      });

      if (selectedSlots.length === 0) {
        toast.info('Wybierz co najmniej jeden przedział czasowy');
        return;
      }

      await sendAvailability({ availability: selectedSlots });
      toast.success('Dostępność została zapisana!');
    },
    onError: () => {
      toast.error('Nie udało się zapisać dostępności');
    },
  });

  const [currentWeek, setCurrentWeek] = useState<WeekAvailability | null>(null);
  const [nextWeek, setNextWeek] = useState<WeekAvailability | null>(null);

  if (!currentWeek && !nextWeek && data) {
    setCurrentWeek(
      initializeWeekAvailability(currentWeekStart, data.currentWeek),
    );
    setNextWeek(initializeWeekAvailability(nextWeekStart, data.nextWeek));
  }

  const toggleTimeSlot = (
    weekType: 'current' | 'next',
    dayIndex: number,
    slotIndex: number,
  ) => {
    const week = weekType === 'current' ? currentWeek : nextWeek;
    if (!week) return;

    // Don't toggle if slot is booked
    if (week.days[dayIndex].timeSlots[slotIndex].booked) return;

    const updatedWeek = { ...week };
    updatedWeek.days[dayIndex].timeSlots[slotIndex].selected =
      !updatedWeek.days[dayIndex].timeSlots[slotIndex].selected;

    if (weekType === 'current') setCurrentWeek(updatedWeek);
    else setNextWeek(updatedWeek);
  };

  if (isLoading || !currentWeek || !nextWeek) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  const renderWeekGrid = (
    week: WeekAvailability,
    weekType: 'current' | 'next',
  ) => {
    return (
      <div className='mt-4 grid grid-cols-8 gap-1'>
        <div className='col-span-1'>
          <div className='h-10'></div> {/* Empty cell for alignment*/}
          {generateTimeSlots().map((time, index) => (
            <div
              key={index}
              className='flex h-10 items-center justify-end pr-2 text-sm font-medium'
            >
              {time}
            </div>
          ))}
        </div>
        {week.days.map((day, dayIndex) => (
          <div key={dayIndex} className='col-span-1'>
            <div className='h-10 text-center text-sm font-medium'>
              <div>
                {day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1)}
              </div>
              <div className='text-xs text-muted-foreground'>
                {format(day.date, 'd MMM', { locale: pl })}
              </div>
            </div>
            {day.timeSlots.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                className={`m-1 h-10 rounded border transition-colors ${
                  slot.booked
                    ? 'flex cursor-not-allowed items-center justify-center border-gray-300 bg-gray-200'
                    : slot.selected
                      ? 'cursor-pointer border-primary bg-primary hover:bg-primary/90'
                      : 'cursor-pointer bg-background hover:bg-muted'
                }`}
                onClick={() =>
                  !slot.booked && toggleTimeSlot(weekType, dayIndex, slotIndex)
                }
                role='checkbox'
                aria-checked={slot.selected}
                aria-disabled={slot.booked}
                tabIndex={slot.booked ? -1 : 0}
                onKeyDown={(e) => {
                  if (!slot.booked && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    toggleTimeSlot(weekType, dayIndex, slotIndex);
                  }
                }}
              >
                {slot.booked && (
                  <span className='font-bold text-gray-500'>X</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className='my-4 w-full'>
      <CardHeader>
        <CardTitle>Ustaw swoją dostępność</CardTitle>
        <CardDescription>
          Wybierz godziny, w których jesteś dostępny/a.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='current-week'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='current-week'>Bieżący tydzień</TabsTrigger>
            <TabsTrigger value='next-week'>Następny tydzień</TabsTrigger>
          </TabsList>
          <TabsContent value='current-week' className='overflow-x-auto'>
            <div className='min-w-[800px]'>
              {renderWeekGrid(currentWeek, 'current')}
            </div>
          </TabsContent>
          <TabsContent value='next-week' className='overflow-x-auto'>
            <div className='min-w-[800px]'>
              {renderWeekGrid(nextWeek, 'next')}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='text-sm text-muted-foreground'>
          Kliknij na przedziały czasowe, aby zaznaczyć/odznaczyć swoją
          dostępność
        </div>
        <Button
          onClick={() => saveAvailability()}
          disabled={isPending || !currentWeek || !nextWeek}
        >
          {isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Save className='mr-2 h-4 w-4' />
          )}
          Zapisz dostępność
        </Button>
      </CardFooter>
    </Card>
  );
}
