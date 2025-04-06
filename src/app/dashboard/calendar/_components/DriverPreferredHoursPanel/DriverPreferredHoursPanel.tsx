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
import { useDriverPreferredQuery } from '@/hooks/Query/useDriverPreferredQuery';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import TimeSlotGroup from './TimeSlotsGroup';
import { formatTimeSlots, groupSlotsByDay, Slot } from './timeSlotUtils';

export function DriverPreferredHours() {
  const [driverPreferences, setDriverPreferences] = useState<
    { start_time: string; end_time: string; status: 'pending' }[]
  >([]);
  const { data, isLoading, error, mutation } = useDriverPreferredQuery();

  const toggleTimeSlot = (slot: Slot) => {
    setDriverPreferences((prev) =>
      prev.some(
        (p) => p.start_time === slot.start_time && p.end_time === slot.end_time,
      )
        ? prev.filter(
            (p) =>
              !(
                p.start_time === slot.start_time && p.end_time === slot.end_time
              ),
          )
        : [
            ...prev,
            {
              start_time: slot.start_time,
              end_time: slot.end_time,
              status: 'pending' as const,
            },
          ],
    );
  };

  const savePreferences = () => {
    if (!driverPreferences.length) return;

    // Prepare events for batch processing
    const events = driverPreferences.map((p) => ({
      start: p.start_time,
      end: p.end_time,
    }));

    mutation.mutate(events);
    setDriverPreferences([]); // Clear after saving
  };

  const renderTimeSlots = (slots: Slot[]) => {
    const groupedSlots = groupSlotsByDay(slots);

    if (groupedSlots.length === 0) {
      return (
        <div className='py-8 text-center text-muted-foreground'>
          Brak dostępnych terminów
        </div>
      );
    }

    return groupedSlots.map((group) => (
      <TimeSlotGroup
        key={group.day}
        group={group}
        toggleTimeSlot={toggleTimeSlot}
      />
    ));
  };

  return (
    <Card className='my-4 w-full'>
      <CardHeader>
        <CardTitle>Wybierz preferowane godziny</CardTitle>
        <CardDescription>Zaznacz preferowane godziny jazdy.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          </div>
        ) : error ? (
          <div className='text-red-500'>
            Błąd:{' '}
            {error instanceof Error ? error.message : 'Coś poszło nie tak'}
          </div>
        ) : (
          <Tabs defaultValue='current-week'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='current-week'>Bieżący tydzień</TabsTrigger>
              <TabsTrigger value='next-week'>Następny tydzień</TabsTrigger>
            </TabsList>
            <TabsContent value='current-week'>
              {data?.currentWeek
                ? renderTimeSlots(
                    formatTimeSlots(data.currentWeek, driverPreferences),
                  )
                : null}
            </TabsContent>
            <TabsContent value='next-week'>
              {data?.nextWeek
                ? renderTimeSlots(
                    formatTimeSlots(data.nextWeek, driverPreferences),
                  )
                : null}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={savePreferences}
          disabled={!driverPreferences.length || mutation.isPending}
          className='ml-auto'
        >
          {mutation.isPending && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          {!mutation.isPending && <Save className='mr-2 h-4 w-4' />}
          Zapisz
        </Button>
      </CardFooter>
    </Card>
  );
}
